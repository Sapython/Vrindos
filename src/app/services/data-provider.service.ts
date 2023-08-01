import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, User, signInWithPopup, signOut } from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, doc, getDoc, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  loggedIn:boolean = false;
  loading:boolean = true;
  userChanged:Subject<Manager> = new Subject<Manager>();
  currentUser:Manager|undefined;
  private createNewAccessTokenFunction = httpsCallable(this.functions,'createNewAccessToken');
  private checkIfAccessTokenIsValidFunction = httpsCallable(this.functions,'checkIfAccessTokenIsValid');
  businessSubject:ReplaySubject<any[]> = new ReplaySubject<any[]>();
  constructor(private auth:Auth,private firestore:Firestore,private functions:Functions,private loadingController:LoadingController, private router:Router) {
    auth.onAuthStateChanged((user)=>{
      console.log("auth state changed",user);
      if(user){
        getDoc(doc(this.firestore,'managers',user.uid)).then((manager)=>{
          this.userChanged.next(manager.data() as Manager);
          this.loggedIn = true;
          this.currentUser = manager.data() as Manager;
          console.log("current user",this.currentUser);
        }).finally(()=>this.loading = false);
      } else {
        this.loggedIn = false;
        this.loading = false;
      }
    });
  }

  async signInWithGoogle(){
    let loader = await this.loadingController.create({
      message:'Signing in with Google'
    });
    loader.present();
    let res = await signInWithPopup(this.auth, new GoogleAuthProvider());
    let userDocRef = doc(this.firestore,'managers/'+res.user.uid);
    let existingUser = await getDoc(userDocRef);
    if (!existingUser.exists()){
      await setDoc(userDocRef,{
        userId:res.user?.uid,
        email:res.user?.email,
        displayName:res.user?.displayName,
        photoURL:res.user?.photoURL,
        access:'none'
      });
    }
    loader.dismiss();
  }

  getAllUsers(){
    collectionData(collection(this.firestore,'business'),{idField:'id'}).subscribe((businesses)=>{
      this.businessSubject.next(businesses);
    })
  }

  generateNewAccessToken(expiryPeriod:string,businessId:string){
    return this.createNewAccessTokenFunction({expiryPeriod:expiryPeriod,username:this.currentUser?.userId,businessId});
  }

  disableAccess(currentBusinessId:string){
    return updateDoc(doc(this.firestore,'business/'+currentBusinessId),{accessCode:null});
  }

  async logout(){
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }
}
export interface Manager {
  userId:string;
  email:string;
  displayName:string;
  photoURL:string;
  access:'none'|'manager'|'admin';
}
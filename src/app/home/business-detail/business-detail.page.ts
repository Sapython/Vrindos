import { Component, OnInit } from '@angular/core';
import { Firestore, Timestamp, collection, doc, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.page.html',
  styleUrls: ['./business-detail.page.scss'],
})
export class BusinessDetailPage implements OnInit {
  businessId:string = '';
  currentBusiness:any;
  renewBusiness:boolean = false;
  disableBusiness:boolean = false;
  validityStatus:undefined|Timestamp;
  private checkIfAccessTokenIsValidFunction = httpsCallable(this.functions,'checkIfAccessTokenIsValid');
  constructor(private activatedRoute:ActivatedRoute,private dataProvider:DataProviderService,private loaderController:LoadingController,private functions:Functions,private firestore:Firestore) {
    this.activatedRoute.params.subscribe((params)=>{
      console.log("params",params);
      
      this.businessId = params['businessId'];
    });
  }
  ionViewWillLeave(){
    this.validityStatus = undefined;
  }

  ionViewWillEnter(){
    if(this.currentBusiness.accessCode){
      this.checkValidity(this.businessId,this.currentBusiness.accessCode).then((res)=>{
        console.log("Validity status",res.docs);
        // this.validityStatus = res.data;
        if(res.docs.length){
          this.validityStatus = res.docs[0].data()['expiry'];
        }
      })
    }
  }

  async ngOnInit() {
    this.dataProvider.businessSubject.subscribe((businesses)=>{
      this.currentBusiness = businesses.find((business)=>business.id == this.businessId);
      this.ionViewWillEnter();
      console.log("current business",this.currentBusiness);
    });
  }

  async renewAccessToken(period:string){
    let loader = await this.loaderController.create({
      message:'Generating new access token'
    });
    loader.present();
    this.dataProvider.generateNewAccessToken(period,this.currentBusiness.id).then((res)=>{
      console.log("res",res);
      this.renewBusiness = false;
    }).catch((err)=>{

    }).finally(()=>{
      this.loaderController.dismiss();
    })
  }

  async disableAccess(){
    let loader = await this.loaderController.create({
      message:'Disabling access'
    });
    loader.present();
    this.dataProvider.disableAccess(this.currentBusiness.id).then((res)=>{
      console.log("res",res);
      this.disableBusiness = false;
    }).finally(()=>{
      this.loaderController.dismiss();
    })
  }

  checkValidity(businessId:string,accessCode:string){
    console.log("businessId",businessId,'accessCode',accessCode);
    return getDocs(
      query(collection(this.firestore,'accessCode'),where('accessCode','==',accessCode),where('businessId','==',businessId))
    );
  }

}

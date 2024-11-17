import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../services/data-provider.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  users:any[] = [];
  constructor(public dataProvider:DataProviderService) { }

  ngOnInit() {
    this.dataProvider.loading = true;
    this.dataProvider.getAllUsers();
    this.dataProvider.businessSubject.subscribe((users)=>{
      console.log("users",users);
      this.users = users;
      this.dataProvider.loading = false;
    });
  }

}

interface BillerUser {
  userId:string;
  businessId:string;
  currentAccessKey:string;
}
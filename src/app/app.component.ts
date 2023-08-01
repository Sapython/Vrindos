import { Component, OnInit } from '@angular/core';
import { DataProviderService } from './services/data-provider.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  loader:any;
  constructor(public dataProvider:DataProviderService,private loaderService:LoadingController) {
    this.dataProvider.userChanged.subscribe((user)=>{
      console.log("user changed",user);
    });
  }
  ngOnInit(): void {
  }
}

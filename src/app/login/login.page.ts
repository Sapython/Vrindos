import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../services/data-provider.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public dataProvider:DataProviderService) { }

  ngOnInit() {
  }

}

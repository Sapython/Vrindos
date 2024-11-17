import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-access-codes',
  templateUrl: './access-codes.page.html',
  styleUrls: ['./access-codes.page.scss'],
})
export class AccessCodesPage implements OnInit {
  accessCodes:any[] = [];
  constructor() { }

  ngOnInit() {
  }

}

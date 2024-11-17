import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccessCodesPageRoutingModule } from './access-codes-routing.module';

import { AccessCodesPage } from './access-codes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccessCodesPageRoutingModule
  ],
  declarations: [AccessCodesPage]
})
export class AccessCodesPageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessCodesPage } from './access-codes.page';

const routes: Routes = [
  {
    path: '',
    component: AccessCodesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessCodesPageRoutingModule {}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataProviderService } from './services/data-provider.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private dataProvider:DataProviderService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.dataProvider.loggedIn){
        return this.dataProvider.loggedIn && this.dataProvider.currentUser?.access == 'admin';
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
  
}

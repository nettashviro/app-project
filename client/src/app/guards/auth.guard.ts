import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { NgFlashMessageService } from "ng-flash-messages";

import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private flashMessage: NgFlashMessageService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (this.authService.isLoggedIn()) {
        return true;
      }
      this.flashMessage.showFlashMessage({
        messages: ['Please make sure you are logged in!'],
        dismissible: true,
        timeout: 4000,
        type: 'danger'
      });
      this.router.navigate(['authenticate']);
  }
}

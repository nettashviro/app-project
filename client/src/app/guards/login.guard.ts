import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { NgFlashMessageService } from "ng-flash-messages";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private flashMessage: NgFlashMessageService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isLoggedIn()) {
      return true;
    }
    this.flashMessage.showFlashMessage({
      messages: ["You are already logged in!"],
      dismissible: true,
      timeout: 4000,
      type: "success",
    });
    this.router.navigate(["/"]);
  }
}

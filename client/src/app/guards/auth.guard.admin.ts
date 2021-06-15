import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Router } from "@angular/router";
import { AuthService } from "./../services/auth.service";
import { NgFlashMessageService } from "ng-flash-messages";

@Injectable({ providedIn: "root" })
export class AuthGuardAdmin implements CanActivate {
  constructor(
    private authService: AuthService,
    private flashMessage: NgFlashMessageService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLoggedIn()) {
      if (this.authService.isAdmin()) return true;
      console.log("ntntn");
      this.flashMessage.showFlashMessage({
        messages: ["unauthorized!"],
        dismissible: true,
        timeout: 4000,
        type: "danger",
      });
      this.router.navigate(["dashboard"]);
      return;
    }
    this.flashMessage.showFlashMessage({
      messages: ["Please make sure you are logged in!"],
      dismissible: true,
      timeout: 4000,
      type: "danger",
    });
    this.router.navigate(["authenticate"]);
  }
}

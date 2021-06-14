// import { Injectable } from "@angular/core";
// import {
//   CanActivate,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
// } from "@angular/router";
// import { Router } from "@angular/router";
// import { AuthService } from "./../services/auth.service";
// import { NgFlashMessageService } from "ng-flash-messages";
//
// @Injectable({
//   providedIn: "root",
// })
// export class AuthGuardadmin implements CanActivate {
//   private flashMessage: NgFlashMessageService;
//
//   constructor(private authService: AuthService, private router: Router) {}
//
//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): boolean {
//     if (this.authService.isLoggedIn()) {
//       return true;
//     }
//     this.flashMessage.showFlashMessage({
//       messages: ["Please make sure you are logged in!"],
//       dismissible: true,
//       timeout: 4000,
//       type: "danger",
//     });
//     this.router.navigate(["authenticate"]);
//   }
// }

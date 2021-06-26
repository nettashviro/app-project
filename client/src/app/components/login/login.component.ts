import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgFlashMessageService } from "ng-flash-messages";
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";
import { ValidateService } from "../../services/validate.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private validateService: ValidateService,
    private flashMessage: NgFlashMessageService,
    private router: Router
  ) {}

  ngOnInit() {}

  onHandleLogin(form: NgForm) {
    let user = {
      username: form.value.username,
      password: form.value.password,
    };

    //Validate Username...........................
    if (!this.validateService.validateUsername(user.username)) {
      this.flashMessage.showFlashMessage({
        messages: ["Invalid Username!"],
        dismissible: true,
        timeout: 4000,
        type: "danger",
      });
      return false;
    }

    //If there is no any errors let's logged in..........
    this.authService.authenticateUser(user).subscribe(
      (data) => {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.showFlashMessage({
          messages: ["You are logged in!"],
          dismissible: true,
          timeout: 2000,
          type: "success",
        });
        this.router.navigate(["/"]);
        return true;
      },
      (err) => {
        this.flashMessage.showFlashMessage({
          messages: ["Username or Password is wrong!"],
          dismissible: true,
          timeout: 2000,
          type: "danger",
        });
        return false;
      }
    );
  }
}

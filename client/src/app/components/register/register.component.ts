import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { NgFlashMessageService } from "ng-flash-messages";
import { Router } from "@angular/router";

import { ValidateService } from "../../services/validate.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private validateService: ValidateService,
    private flashMessage: NgFlashMessageService,
    private router: Router
  ) { }

  ngOnInit() {}

  onHandleSubmit(form: NgForm) {
    let user = {
      name: form.value.name,
      email: form.value.email,
      username: form.value.username,
      password: form.value.password,
      password2: form.value.password2
    };

    //Validate Name..........................
    if (!this.validateService.validateName(user.name)) {
      this.flashMessage.showFlashMessage({
        messages: ['Invalid Name!'],
        dismissible: true,
        timeout: 4000,
        type: 'danger'
      });
      return false;
    }

    //Validate Email Id...............................
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.showFlashMessage({
        messages: ['Invalid Email Id!'],
        dismissible: true,
        timeout: 4000,
        type: 'danger'
      });
      return false;
    }

    //Validate Username...........................
    if (!this.validateService.validateUsername(user.username)) {
      this.flashMessage.showFlashMessage({
        messages: ['Invalid Username!'],
        dismissible: true,
        timeout: 4000,
        type: 'danger'
      });
      return false;
    }

    //Validate Password....................
    if (!this.validateService.validatePassword(user.password, user.password2)) {
      this.flashMessage.showFlashMessage({
        messages: ['Password not matched!'],
        dismissible: true,
        timeout: 4000,
        type: 'danger'
      });
      return false;
    }

    //If there is no any errors then add user....................
    this.authService.registerUser(user).subscribe(data => {
      if (data) {
        this.flashMessage.showFlashMessage({
          messages: ["Your account successfully created, Let's get logged in!"],
          dismissible: true,
          timeout: 4000,
          type: 'success'
        });
        this.router.navigate(['authenticate']);
        form.resetForm();
        return true;
      } else {
        this.flashMessage.showFlashMessage({
          messages: ['Something went wrong!'],
          dismissible: true,
          timeout: 4000,
          type: 'danger'
        });
        this.router.navigate(['items']);
        return false;
      }
    });
  }
}

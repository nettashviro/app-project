import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgFlashMessageService } from "ng-flash-messages";

import { AuthService } from "../../services/auth.service";

//Import LocalUser Model
import { LocalUserModel } from "../../models/local-user.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title: string;
  user: LocalUserModel;
  constructor(
    public authService: AuthService,
    private router: Router,
    private flashMessage: NgFlashMessageService
  ) { }

  ngOnInit() {
    this.title = "Buy Cheap";
    this.onLoadUser();
  }

  onCartClick() {
    this.onLoadUser();
    this.router.navigate(['user/item', this.user.id]);
  }

  onHandleLogOut() {
    this.authService.logoutUser();
    this.flashMessage.showFlashMessage({
      messages: ['You are logged out!'],
      dismissible: true,
      timeout: 4000,
      type: 'success'
    });
    this.router.navigate(['']);
  }

  onLoadUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

}

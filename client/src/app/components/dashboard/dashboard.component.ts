import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  localUser: string;
  title: string;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.fetchDashBoard();
    this.title = "Buy Cheap Gives You The Best Ever";
  }

  fetchDashBoard() {
    this.authService.getDashBoard().subscribe(data => {
      this.localUser = data.name;
    });
  }

}

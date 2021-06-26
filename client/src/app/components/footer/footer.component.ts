import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LocalUserModel } from "../../models/local-user.model";
@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent implements OnInit {
  user: LocalUserModel;

  constructor(private router: Router) {}

  ngOnInit() {}
  onCartClick() {
    this.onLoadUser();
    this.router.navigate(["user/item", this.user.id]);
  }
  onLoadUser() {
    this.user = JSON.parse(localStorage.getItem("user"));
  }
}

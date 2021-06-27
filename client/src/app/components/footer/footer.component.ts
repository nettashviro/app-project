import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BranchModel } from "src/app/models/branch.model";
import { BranchService } from "src/app/services/branch.service";
import { LocalUserModel } from "../../models/local-user.model";
@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent implements OnInit {
  user: LocalUserModel;
  branches: BranchModel[];

  constructor(private router: Router, private branchService: BranchService) {}

  ngOnInit() {
    this.loadBranches();
  }

  loadBranches() {
    this.branchService.getBranches().subscribe((data) => {
      this.branches = data;
    });
  }
  onCartClick() {
    this.onLoadUser();
    this.router.navigate(["user/item", this.user.id]);
  }
  onLoadUser() {
    this.user = JSON.parse(localStorage.getItem("user"));
  }
}

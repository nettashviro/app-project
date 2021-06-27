import { Component, OnInit } from "@angular/core";
import { BranchModel } from "src/app/models/branch.model";
import { BranchService } from "src/app/services/branch.service";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
  branches: BranchModel[];

  constructor(private branchService: BranchService) {}

  ngOnInit() {
    this.loadBranches();
  }

  loadBranches() {
    this.branchService.getBranches().subscribe((data) => {
      this.branches = data;
    });
  }
}

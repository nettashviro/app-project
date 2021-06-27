import { Component, OnInit } from "@angular/core";
import { google } from "@agm/core/services/google-maps-types";
import { BranchService } from "src/app/services/branch.service";
import { BranchModel } from "src/app/models/branch.model";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnInit {
  branches: BranchModel[];

  // israel location
  latitude = 32.4117257;
  longitude = 35.0818155;
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

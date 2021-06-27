import { Injectable } from "@angular/core";
import { LocalUserModel } from "../models/local-user.model";
import { UserItemService } from "./user-item.service";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  globalAmountUserItem: number;
  user: LocalUserModel;

  constructor(private userItemService: UserItemService) {}

  onLoadUser() {
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  fetchUserItems() {
    this.onLoadUser();
    if (this.user && this.user["id"]) {
      this.userItemService.getUserItem(this.user["id"]).subscribe((data) => {
        let validItems = data.items.filter((item) => item != null);
        this.setGlobalAmountUserItem(validItems.length);
      });
    }
  }

  setGlobalAmountUserItem(number) {
    this.globalAmountUserItem = number;
  }

  getGlobalAmountUserItem() {
    return this.globalAmountUserItem;
  }
}

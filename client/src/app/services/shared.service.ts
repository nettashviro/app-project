import { Injectable } from "@angular/core";
import { UserItemService } from "./user-item.service";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  globalAmountUserItem: number;

  constructor(private userItemService: UserItemService) {}

  fetchUserItems() {
    if (this.userItemService.user && this.userItemService.user["id"]) {
      this.userItemService
        .getUserItem(this.userItemService.user["id"])
        .subscribe((data) => {
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

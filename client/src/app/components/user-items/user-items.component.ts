import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgFlashMessageService } from "ng-flash-messages";

import { UserItemService } from "../../services/user-item.service";

//Import UserItem Model
import { allUserItemsModel, UserItemModel } from "../../models/user-item.model";
import { SharedService } from "src/app/services/shared.service";
@Component({
  selector: "app-user-items",
  templateUrl: "./user-items.component.html",
  styleUrls: ["./user-items.component.css"],
})
export class UserItemsComponent implements OnInit {
  id: string;
  userItem: allUserItemsModel;
  filteredItems: UserItemModel[];
  search: string;
  totalAmount: number;

  constructor(
    private userItemService: UserItemService,
    private sharedService: SharedService,
    private router: Router,
    private flashMessage: NgFlashMessageService
  ) {}

  ngOnInit() {
    this.id = this.router.url.split("/")[3];
    this.fetchUserItems();
  }

  fetchUserItems() {
    this.userItemService.getUserItem(this.id).subscribe((data) => {
      let validItems = data.items.filter((item) => item != null);
      data.items = validItems;

      this.userItem = data;
      this.filteredItems = data.items;
      this.totalAmount =
        data.items.length > 0
          ? data.items
              .map((item) => Number(item.price))
              .reduceRight((x, y) => x + y)
          : 0;
    });
  }

  onCheckoutClick() {
    this.router.navigate(["checkout"]);
  }

  onSearchChange(value: string) {
    this.search = value;
    this.filteredItems = this.userItem.items;
    this.filteredItems = this.getFilteredData();
  }

  getFilteredData() {
    return this.filterSearch(this.filteredItems);
  }

  filterSearch(userItems) {
    return userItems.filter(
      (currentItem) =>
        currentItem.name.includes(this.search)
    );
  }

  onDeleteItem(id: string) {
    if (confirm(`Do you want to delete this item...?`)) {
      this.userItemService.deleteItem(id).subscribe((data) => {
        if (data) {
          this.sharedService.fetchUserItems();
          this.fetchUserItems();
          this.flashMessage.showFlashMessage({
            messages: ["Item deleted from your cart, Let's add one!"],
            dismissible: true,
            timeout: 4000,
            type: "success",
          });
        }
      });
    } else {
      this.router.navigate(["user/item", this.id]);
    }
  }
}

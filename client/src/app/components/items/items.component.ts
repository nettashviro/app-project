import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { NgFlashMessageService } from "ng-flash-messages";

import { ItemService } from "../../services/item.service";
import { AuthService } from "../../services/auth.service";
import { ValidateService } from "../../services/validate.service";
import { UserItemService } from "../../services/user-item.service";

//Import Item Model
import { ItemModel } from "../../models/item.model";

//Import Countries
import { CountryModel } from "../../models/countries.model";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.css"],
})
export class ItemsComponent implements OnInit {
  items: ItemModel[];
  selectedItem: ItemModel;

  constructor(
    private itemService: ItemService,
    public authService: AuthService,
    public validateService: ValidateService,
    private userItemService: UserItemService,
    private flashMessage: NgFlashMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchItems();
  }

  fetchItems() {
    this.itemService.getItems().subscribe((items) => {
      this.items = items;
    });
  }

  onAddToCart(_id: string, name: string, price: string) {
    let userItem = {
      _id,
      name,
      price,
    };

    this.userItemService.saveUserItem(userItem).subscribe((data) => {
      if (data) {
        this.flashMessage.showFlashMessage({
          messages: ["Item added to your cart!"],
          dismissible: true,
          timeout: 4000,
          type: "success",
        });
        this.router.navigate(["items"]);
        return true;
      }
    });
  }

  deleteItem(itemId: string) {
    // TODO: remove from screen and give the user a message of success
    this.itemService.deleteItem(itemId).subscribe((res) => {
      console.log("res", res);
    });
  }

  updateItem(item: ItemModel) {
    // TODO: update from screen and give the user a message of success
    this.itemService.updateItem(item).subscribe((res) => {
      console.log("res", res);
    });
  }

  setItemForEdit(item) {
    this.selectedItem = item;
  }

  onEditItem(form: NgForm, event) {
    this.selectedItem = { ...this.selectedItem, ...form.value };

    //Check for valid contact number
    /*
    if (!this.validateService.validateContactNumber(userItem.contact_info)) {
      console.log(`contact number error`);
      return false;
    }

    //Check for valid credit card
    if (!this.validateService.validateCreditCardNumber(userItem.credit_card)) {
      console.log(`credit card number error`);
      return false;
    }
    */

    this.itemService.updateItem(this.selectedItem).subscribe((data) => {
      if (data) {
        this.flashMessage.showFlashMessage({
          messages: ["Item added to your cart!"],
          dismissible: true,
          timeout: 4000,
          type: "success",
        });
        this.fetchItems();
        return true;
      }
    });
  }
}

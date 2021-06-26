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

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.css"],
})
export class ItemsComponent implements OnInit {
  items: ItemModel[];
  itemsCopy: ItemModel[];
  image: File;
  search: string;
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
      this.itemsCopy = items;
    });
  }

  onSearchChange(value: string) {
    this.search = value;
    this.items = this.itemsCopy.filter((item) => item.name.includes(value) || item.category.includes(value));
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
    this.itemService.deleteItem(itemId).subscribe((res) => {
      if (res) {
        this.flashMessage.showFlashMessage({
          messages: ["Item Deleted Successfully"],
          dismissible: true,
          timeout: 2000,
          type: "success",
        });
        this.fetchItems();
      } else {
        this.flashMessage.showFlashMessage({
          messages: ["Item Deleted Unsuccessfully"],
          dismissible: true,
          timeout: 2000,
          type: "danger",
        });
      }
    });
  }

  setItemForEdit(item: ItemModel) {
    this.selectedItem = item;
  }

  uploadImage(file: File) {
    console.log(file[0]);
    this.image = file[0];
  }

  onEditItem(form: NgForm) {
    // let image;
    // if (!this.image) {
    //   image = this.selectedItem.image;
    //   this.selectedItem = { ...this.selectedItem, ...form.value };
    //   this.selectedItem.image = image;
    // } else {
    this.selectedItem = { ...this.selectedItem, ...form.value };
    //   this.selectedItem.image = this.image.name;
    // }
    // let image = form.value.image.split('\\')

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
          messages: ["Item was updated successfully!"],
          dismissible: true,
          timeout: 2000,
          type: "success",
        });
        this.fetchItems();
        return true;
      } else {
        this.flashMessage.showFlashMessage({
          messages: ["There was an error adding the item to your cart"],
          dismissible: true,
          timeout: 2000,
          type: "danger",
        });
      }
    });
  }
}

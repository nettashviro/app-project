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
  categories: string[];
  image: File;
  search: string;
  minPrice: number;
  maxPrice: number;
  pickedCategories: string[];
  selectedItem: ItemModel;

  constructor(
    private itemService: ItemService,
    public authService: AuthService,
    public validateService: ValidateService,
    private userItemService: UserItemService,
    private flashMessage: NgFlashMessageService,
    private router: Router
  ) {
    this.minPrice = 0;
    this.maxPrice = 0;
    this.search = '';
    this.pickedCategories = [];
  }

  ngOnInit() {
    this.fetchItems();
    this.fetchCategories();
  }

  fetchItems() {
    this.itemService.getItems().subscribe((items) => {
      this.items = items;
      this.itemsCopy = items;
    });
  }

  fetchCategories() {
    this.itemService.getCategories().subscribe((categories) => {
      this.categories = categories;
    })
  }

  pickCategory(isChecked: boolean, category: string) {
    if (isChecked) {
      this.pickedCategories.push(category)
    } else {
      this.pickedCategories = this.pickedCategories.filter(curr => curr !== category)
    }
    this.items = this.getFilteredData()
  }

  onMaxChange(value: string) {
    this.maxPrice = parseInt(value)
    this.items = this.getFilteredData();
  }

  onMinChange(value: string) {
    this.minPrice = parseInt(value)
    this.items = this.getFilteredData();
  }

  onSearchChange(value: string) {
    this.search = value;
    this.items = this.getFilteredData();
  }

  getFilteredData() {
    return this.filterCategories(this.filterSearch(this.filterPrices(this.itemsCopy)))
  }

  filterPrices(items: ItemModel[]) {
    if ((this.maxPrice == this.minPrice && this.minPrice == 0) || isNaN(this.minPrice) || isNaN(this.maxPrice)) {
      return items
        .filter((item) => item.name.includes(this.search) || item.category.includes(this.search))
    } else {
      return items
        .filter((item) => parseInt(item.price) > this.minPrice)
        .filter((item) => parseInt(item.price) < this.maxPrice)
    }
  }

  filterSearch(items: ItemModel[]) {
    return items.filter((item) => item.name.includes(this.search) || item.category.includes(this.search))
  }

  filterCategories(items: ItemModel[]) {
    if (!this.pickedCategories.length) {
      return items
    }
    return items.filter(item => this.pickedCategories.includes(item.category))
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
    this.selectedItem = { ...this.selectedItem, ...form.value };
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

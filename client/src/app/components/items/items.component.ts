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
  fetchedColors: string[];
  image: File;
  search: string;
  minPrice: number;
  maxPrice: number;
  pickedCategories: string[];
  pickedColors: string[];
  selectedItem: ItemModel;
  modalState: string;

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
    this.pickedColors = [];
    this.fetchedColors = []
    this.modalState = ''
  }

  ngOnInit() {
    this.fetchItems();
    this.fetchCategories();
    this.fetchColors();
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

  fetchColors() {
    this.itemService.getColors().subscribe((colors) => {
      this.fetchedColors = colors;
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

  pickColor(isChecked: boolean, color: string) {
    if (isChecked) {
      this.pickedColors.push(color)
    } else {
      this.pickedColors = this.pickedColors.filter(curr => curr !== color)
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
    return this.filterColors(this.filterCategories(this.filterSearch(this.filterPrices(this.itemsCopy))))
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

  filterColors(items: ItemModel[]) {
    if (!this.pickedColors.length) {
      return items
    }
    return items.filter(item => this.matchedColors(this.pickedColors, item.colors))
  }

  matchedColors(pickedColors: string[], itemColors: string[]): boolean {
    const intersection = pickedColors.filter(element => itemColors.includes(element));
    return Boolean(intersection.length)
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
        this.ngOnInit();
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
    this.modalState = 'edit'
  }

  newItemState() {
    this.modalState = 'add'
  }

  uploadImage(file: File) {
    this.image = file[0];
  }

  onSubmit(form: NgForm) {
    if (typeof (form.value.colors) == 'string') {
      this.selectedItem = { ...this.selectedItem, colors: form.value.colors.split(',') }
    } else {
      this.selectedItem = { ...this.selectedItem, colors: form.value.colors }
    }
    this.selectedItem = { ...this.selectedItem, ...{ name: form.value.name, category: form.value.category, price: form.value.price, } };
    if (this.image) {
      this.selectedItem = { ...this.selectedItem, ...{ image: this.image } }
    }
    if (this.modalState == 'add') {
      console.log("add", this.selectedItem)
      this.itemService.createItem(this.selectedItem).subscribe((data) => {
        this.flashMessage.showFlashMessage({
          messages: ["Item was added successfully!"],
          dismissible: true,
          timeout: 2000,
          type: "success",
        });
        this.ngOnInit();
        return true;
      }, (err) => {
        this.flashMessage.showFlashMessage({
          messages: ["There was an error adding the item"],
          dismissible: true,
          timeout: 2000,
          type: "danger",
        });
      })

    } else if (this.modalState == 'edit') {
      console.log(form.value)
      console.log("edit", this.selectedItem)

      this.itemService.updateItem(this.selectedItem).subscribe((data) => {
        this.flashMessage.showFlashMessage({
          messages: ["Item was updated successfully!"],
          dismissible: true,
          timeout: 2000,
          type: "success",
        });
        this.ngOnInit();
        return true;
      }, (err) => {
        this.flashMessage.showFlashMessage({
          messages: ["There was an error adding the item to your cart"],
          dismissible: true,
          timeout: 2000,
          type: "danger",
        });
      })
    }
    this.modalState = ''
  }
}

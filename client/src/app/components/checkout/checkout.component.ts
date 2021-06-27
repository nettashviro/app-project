import { NgFlashMessageService } from "ng-flash-messages";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { UserItemService } from "../../services/user-item.service";
import { CheckoutService } from "../../services/checkout.service";

import { UserItemModel } from "../../models/user-item.model";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit {
  items: UserItemModel[];
  customer: string;
  price: number;

  constructor(
    private flashMessage: NgFlashMessageService,
    private userItemService: UserItemService,
    public checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit() {
    this.onLoadUser();
    this.fetchUserItems();
  }

  onLoadUser() {
    this.customer = JSON.parse(localStorage.getItem("user")).id;
  }
  
  fetchUserItems() {
    this.userItemService.getUserItem(this.customer).subscribe((data) => {
      this.items = data.items;
      this.price = data.items.length > 0 ? data.items.map(item => Number(item.price)).reduceRight((x, y) => x + y) : 0;
    });
  }

  onAddOrder(price: string, items: UserItemModel[], customer: string) {
    let order = {
      totalPrice: price,
      items,
      customer,
    };

    this.checkoutService.saveOrder(order).subscribe((data) => {
      if (data) {
        this.flashMessage.showFlashMessage({
          messages: ["Order confirmed!"],
          dismissible: true,
          timeout: 4000,
          type: "success",
        });
        this.router.navigate(["user/orders"]);
        return true;
      }
    });
  }
}

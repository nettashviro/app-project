import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserOrderModel } from 'src/app/models/checkout.model';

import { CheckoutService } from "../../services/checkout.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  id: string;
  orders: UserOrderModel[];
  
  constructor(
    private router: Router,
    private checkoutService: CheckoutService
  ) { }

  ngOnInit() {
    this.id = this.router.url.split('/')[3];
    this.getOrders();
  }

  
  getOrders() {
    this.checkoutService.getOrders().subscribe((data) => {
      this.orders = data;
      console.log(data);
    })
  }
}

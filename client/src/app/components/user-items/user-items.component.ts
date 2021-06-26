import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgFlashMessageService } from "ng-flash-messages";

import { UserItemService } from "../../services/user-item.service";

//Import UserItem Model
import { allUserItemsModel } from "../../models/user-item.model";
@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.css']
})
export class UserItemsComponent implements OnInit {
  id: string;
  userItem: allUserItemsModel;
  constructor(
    private userItemService: UserItemService,
    private router: Router,
    private flashMessage: NgFlashMessageService
  ) { }

  ngOnInit() {
    this.id = this.router.url.split('/')[3];
    this.fetchUserItems();
  }

  fetchUserItems() {
    this.userItemService.getUserItem(this.id).subscribe(data => {
      this.userItem = data;
    });
  }

  onCheckoutClick() {
    this.router.navigate(["checkout"]);
  }

  onDeleteItem(id: string) {
    if (confirm(`Do you want to delete this item...?`)) {
      this.userItemService.deleteItem(id).subscribe(data => {
        if (data.success) {
          this.flashMessage.showFlashMessage({
            messages: ["Item deleted from your cart, Let's add one!"],
            dismissible: true,
            timeout: 4000,
            type: 'success'
          });
        }
        this.router.navigate(['items']);
      });
    } else {
      this.router.navigate(['user/item', this.id]);
    }
  }


}

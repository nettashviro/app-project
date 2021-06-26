import {Component, Injectable, OnInit} from "@angular/core";
import { SocketService } from "src/app/services/socket.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ItemModel} from "../../models/item.model";
import { ItemService } from '../../services/item.service';
import {environment} from "../../../environments/environment";

@Injectable({ providedIn: "root" })
@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  usersCount: Number;
  itemName: string;
  foundItem = '';
  private uri: string = environment.apiBaseUrl;
  constructor(private socketService: SocketService, private itemService: ItemService
  ) {}

  ngOnInit(): void {
    // Connect to socket.io server
    this.socketService.listen("userConnected").subscribe((data: Number) => {
      this.usersCount = data;
    });
  }

  searchItemExists() {
    if (this.itemName === '') {
      this.foundItem = '';
      return;
    }
    this.itemService.searchItemExists(this.itemName).subscribe(data => {
      if (data.message === 'found') {
        this.foundItem = 'item exists';
      } else {
        this.foundItem = 'item doesnt exist';
      }
        console.log(data);
    },
    error => {
      if (error.status === 400) {
        this.foundItem = 'item doesnt exist';
      }
    });
  }
}

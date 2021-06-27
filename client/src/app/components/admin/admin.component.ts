import { Component, OnInit } from "@angular/core";
import { SocketService } from "src/app/services/socket.service";
import { ItemService } from '../../services/item.service';
import { StatService } from "src/app/services/stat.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  itemName: string;
  foundItem = '';
  onlineUsersCount: any;
  usersCount: any;
  ordersCount: any;
  cashierCount: any;
  totalIncomes: number;
  uniqueConnectionsAproximation = 0;
  constructor(
    private socketService: SocketService,
    private statService: StatService,
    private itemService: ItemService,
    private authService: AuthService
  ) {
    this.onlineUsersCount = this.socketService.emit("onlineUserCount", null);
    this.cashierCount = this.socketService.emit("getCashierCount", null);
    this.statService.getUsers().subscribe((data) => {
      this.usersCount = data["users"].length;
    });
    this.totalIncomes = 9999
    this.statService.getOrders().subscribe((data) => {
      this.ordersCount = data.length;
    });
  }

  ngOnInit(): void {
    // Connect to socket.io server
    this.socketService.listen("connected").subscribe((data) => {
      this.onlineUsersCount = data;
    });

    this.socketService.listen("register").subscribe((data) => {
      console.log("register", data);
      this.usersCount = data;
    });

    this.socketService.listen("ordersCount").subscribe((data) => {
      console.log("newOrder");
      this.ordersCount = data;
    });

    this.socketService.listen("cashierCount").subscribe((data) => {
      console.log("cashierCount");
      this.cashierCount = data;
    });

    this.authService.getUniqueConnections().subscribe(
      data => {
        this.uniqueConnectionsAproximation = data.connectionsCount;
      },
      error => {
        this.uniqueConnectionsAproximation = -1;
      });

      this.getTotalIncomes();
  }

  getTotalIncomes() {
    this.itemService.getTotalIncomes().subscribe((totalIncomes) => {
      this.totalIncomes = totalIncomes;
    }, (err)=> {
      this.totalIncomes = 0;
    });
  }

  setCashierCount() {
    this.socketService.emit("setCashierCount", this.cashierCount);
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

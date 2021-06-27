import { Component, OnInit } from "@angular/core";
import { SocketService } from "src/app/services/socket.service";
import { StatService } from "src/app/services/stat.service";
@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  onlineUsersCount: any;
  usersCount: any;
  ordersCount: any;
  cashierCount: any;

  constructor(
    private socketService: SocketService,
    private statService: StatService
  ) {
    this.onlineUsersCount = this.socketService.emit("onlineUserCount", null);
    this.cashierCount = this.socketService.emit("getCashierCount", null);
    this.statService.getUsers().subscribe((data) => {
      this.usersCount = data["users"].length;
    });

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
  }

  setCashierCount() {
    this.socketService.emit("setCashierCount", this.cashierCount);
  }
}

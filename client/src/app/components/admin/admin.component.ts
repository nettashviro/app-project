import { Component, OnInit } from "@angular/core";
import { SocketService } from "src/app/services/socket.service";
@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  usersCount: any;

  constructor(private socketService: SocketService) {
    this.usersCount = this.socketService.emit("onlineUserCount");
  }

  ngOnInit(): void {
    // Connect to socket.io server
    this.socketService.listen("connected").subscribe((data) => {
      this.usersCount = data;
    });
  }
}

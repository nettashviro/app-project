import { Component, OnInit } from "@angular/core";
import { SocketService } from "src/app/services/socket.service";
@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  usersCount: Number;

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    // Connect to socket.io server
    this.socketService.listen("userConnected").subscribe((data: Number) => {
      this.usersCount = data;
    });
  }
}

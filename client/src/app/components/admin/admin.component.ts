import {Component, Injectable, OnInit} from "@angular/core";
import { SocketService } from "src/app/services/socket.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ItemModel} from "../../models/item.model";
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
  private uri: string = environment.apiBaseUrl;
  constructor(private socketService: SocketService, private http: HttpClient) {}

  ngOnInit(): void {
    // Connect to socket.io server
    this.socketService.listen("userConnected").subscribe((data: Number) => {
      this.usersCount = data;
    });
  }

  searchItemExists() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<string>(`${this.uri}/items/exists/${this.itemName}`, {
      headers: headers,
    });
  }
}

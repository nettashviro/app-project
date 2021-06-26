import { io } from "socket.io-client";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class SocketService {
  constructor() {
    this.socket = io(environment.serverUrl);
  }
  usersCount: Number;
  socket: any; // socket that connects to our socket.io server

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}

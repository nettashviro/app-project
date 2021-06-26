import { io } from "socket.io-client";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class SocketService {
  socket: any; // socket that connects to our socket.io server
  constructor() {
    this.socket = io(environment.serverUrl);
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}

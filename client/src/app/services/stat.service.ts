import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

//Import Item Model
import { UserModel } from "../models/user.model";

@Injectable({ providedIn: "root" })
export class StatService {
  private uri: string = environment.apiBaseUrl;
  constructor(private http: HttpClient) {
    console.log(`item service injected!`);
  }

  getUsers(): Observable<UserModel[]> {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });

    return this.http.get<UserModel[]>(`${this.uri}/user`, {
      headers: headers,
    });
  }

  getOrders(): Observable<UserModel[]> {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });

    return this.http.get<UserModel[]>(`${this.uri}/order`, {
      headers: headers,
    });
  }
}

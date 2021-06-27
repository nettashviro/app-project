import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

//Import Item Model
import { UserOrderModel } from "../models/checkout.model";

@Injectable({ providedIn: "root" })
export class CheckoutService {
  private uri: string = environment.apiBaseUrl;
  token: string;
  user: object;

  constructor(private http: HttpClient) {}

  //Add order
  saveOrder(userOrder: object): Observable<UserOrderModel> {
    this.onLoadToken();
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.token,
    });
    return this.http.post<UserOrderModel>(
      `${this.uri}/order/addOrder`,
      userOrder,
      { headers: headers }
    );
  }
  
  //Add order
  getOrders(): Observable<UserOrderModel[]> {
    this.onLoadToken();
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.token,
    });
    if (this.user['isAdmin']) {
      return this.http.get<UserOrderModel[]>(
        `${this.uri}/order/getOrders`,
        { headers: headers }
      );
    }
    return this.http.get<UserOrderModel[]>(
      `${this.uri}/order/getUserOrders/${this.user['id']}`,
      { headers: headers }
    );
  }

  //Get token from the local storage
  onLoadToken() {
    this.token = localStorage.getItem("access_token");
    this.user = JSON.parse(localStorage.getItem("user"));
  }
}

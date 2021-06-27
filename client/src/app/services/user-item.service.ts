import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { allUserItemsModel, UserItemModel } from "../models/user-item.model";
import { DeleteModel } from "../models/delete.model";

@Injectable({ providedIn: "root" })
export class UserItemService {
  private uri: string = environment.apiBaseUrl;
  token: string;
  user: object;

  constructor(private http: HttpClient) {}

  //Add items to cart
  saveUserItem(userItem: object): Observable<UserItemModel> {
    this.onLoadToken();
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.token,
    });
    return this.http.post<UserItemModel>(`${this.uri}/cart/addItem`, userItem, {
      headers: headers,
    });
  }

  //Get all items to cart
  getUserItem(id: string): Observable<allUserItemsModel> {
    this.onLoadToken();
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.token,
    });
    return this.http.get<allUserItemsModel>(`${this.uri}/cart/getCart/${id}`, {
      headers: headers,
    });
  }

  //Delete item from cart
  deleteItem(id: string): Observable<DeleteModel> {
    this.onLoadToken();
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.token,
    });
    return this.http.delete<DeleteModel>(
      `${this.uri}/cart/deleteItem/${this.user["id"]}/${id}`,
      {
        headers: headers,
      }
    );
  }

  // Delete cart
  deleteUserCart(): Observable<DeleteModel> {
    this.onLoadToken();
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.token,
    });
    console.log("make req");
    return this.http.delete<DeleteModel>(`${this.uri}/cart/deleteCart`, {
      headers: headers,
    });
  }

  //Get token from the local storage
  onLoadToken() {
    this.token = localStorage.getItem("access_token");
    this.user = JSON.parse(localStorage.getItem("user"));
  }
}

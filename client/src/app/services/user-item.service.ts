import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

//Import UserItem Model
import { UserItemModel } from "../models/user-item.model";

//Import Delete Model
import { DeleteModel } from "../models/delete.model";

@Injectable({
  providedIn: 'root'
})
export class UserItemService {
  private uri: string = 'http://localhost:5000';
  token: string;

  constructor(
    private http: HttpClient
  ) { }

  //Add items to cart
  saveUserItem(userItem: object): Observable<UserItemModel> {
    this.onLoadToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    });
    return this.http.post<UserItemModel>(`${this.uri}/user/item/add`, userItem, { headers: headers });
  }

  //Get all items to cart
  getUserItem(id: string): Observable<UserItemModel[]> {
    this.onLoadToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    });
    return this.http.get<UserItemModel[]>(`${this.uri}/user/item/${id}`, { headers: headers });
  }

  //Delete item from cart
  deleteItem(id: string): Observable<DeleteModel> {
    this.onLoadToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    });
    return this.http.delete<DeleteModel>(`${this.uri}/user/item/${id}`, { headers: headers });
  }

  //Get token from the local storage
  onLoadToken() {
    this.token = localStorage.getItem('access_token');
  }
}

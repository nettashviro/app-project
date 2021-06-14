import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

//Import User Model
import { UserModel } from "../models/user.model";

//import Local User Model
import { LocalUserModel } from "../models/local-user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private uri: string = 'http://localhost:5000';
  token: string;
  user: any;

  constructor(
    private http: HttpClient
  ) {
    console.log(`auth service injected!`);
  }

  //Register user
  registerUser(user: object): Observable<UserModel> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<UserModel>(`${this.uri}/user/register`, user, { headers: headers });
  }

  //Authenticate user
  authenticateUser(user: object): Observable<UserModel> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<UserModel>(`${this.uri}/user/authenticate`, user, {
      headers: headers
    });
  }

  //Store current user & token in local storage
  storeUserData(token: string, user: object) {
    this.token = token;
    this.user = user;
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  //Logout User
  logoutUser() {
    localStorage.clear();
    this.user = null;
    this.token = null;
  }

  //Return the token if it's not null
  isLoggedIn(): boolean {
    return ( localStorage.getItem('access_token') !== null );
  }

  //Get the token & user back
  onLoadUserData() {
    this.token = localStorage.getItem('access_token');
    this.user = localStorage.getItem('user');
  }

  //Get dashboard
  getDashBoard(): Observable<LocalUserModel> {
    this.onLoadUserData();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    });
    return this.http.get<LocalUserModel>(`${this.uri}/user/dashboard`, { headers: headers });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

//Import Item Model
import { ItemModel } from "../models/item.model";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private uri: string = 'http://localhost:5000';
  constructor(
    private http: HttpClient
  ) {
    console.log(`item service injected!`);
  }

  getItems(): Observable<ItemModel[]> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<ItemModel[]>(`${this.uri}/api/items`, { headers: headers });
  }
}

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

//Import Item Model
import { ItemModel } from "../models/item.model";

@Injectable({ providedIn: "root" })
export class ItemService {
  private uri: string = environment.apiBaseUrl;
  constructor(private http: HttpClient) {
    console.log(`item service injected!`);
  }

  getItems(): Observable<ItemModel[]> {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.get<ItemModel[]>(`${this.uri}/items`, {
      headers: headers,
    });
  }
}

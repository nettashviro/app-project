import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

//Import Item Model
import { ItemModel } from "../models/item.model";
import { GeneralMessageModel } from "../models/generalMessage.model";

@Injectable({ providedIn: "root" })
export class ItemService {
  private uri: string = environment.apiBaseUrl;
  constructor(private http: HttpClient) {
    console.log(`item service injected!`);
  }

  getItems(): Observable<ItemModel[]> {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.get<ItemModel[]>(`${this.uri}/getItems`, {
      headers: headers,
    });
  }

  deleteItem(id): Observable<ItemModel[]> {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.delete<ItemModel[]>(`${this.uri}/deleteItem/${id}`, {
      headers: headers,
    });
  }

  updateItem(item: ItemModel): Observable<ItemModel[]> {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.put<ItemModel[]>(`${this.uri}/updateItem`, item, {
      headers: headers,
    });
  }

  createItem(item: ItemModel): Observable<ItemModel[]> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return this.http.post<ItemModel[]>(`${this.uri}/addItem`, item, {
      headers
    });
  }

  updateImage(image: FormData): Observable<ItemModel[]> {
    return this.http.put<ItemModel[]>(`${this.uri}/updateImage`, image);
  }

  searchItemExists(itemName) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.get<GeneralMessageModel>(
      `${this.uri}/items/exists/${itemName}`,
      {}
    );
  }
  getCategories(): Observable<string[]> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.get<string[]>(`${this.uri}/getCategories`, {
      headers: headers,
    });
  }

  getTotalIncomes(): Observable<number> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.get<number>(`${this.uri}/order/totalIncomes`, {
      headers: headers,
    });
  }

  getColors(): Observable<string[]> {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.get<string[]>(`${this.uri}/getColors`, {
      headers: headers,
    });
  }
}

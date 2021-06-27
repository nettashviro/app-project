import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

import { connectionsGroupByModel } from "../models/connections.model";

@Injectable({ providedIn: "root" })
export class ConnectionsService {
  private uri: string = environment.apiBaseUrl;
  constructor(private http: HttpClient) {
    console.log(`connections service injected!`);
  }

  getConnectionByDate(): Observable<connectionsGroupByModel[]> {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.get<connectionsGroupByModel[]>(
      `${this.uri}/user/connections/date`,
      {
        headers: headers,
      }
    );
  }
}

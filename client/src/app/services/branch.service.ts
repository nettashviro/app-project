import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { BranchModel } from "../models/branch.model";

@Injectable({
  providedIn: "root",
})
export class BranchService {
  private uri: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getBranches(): Observable<BranchModel[]> {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http.get<BranchModel[]>(`${this.uri}/branch`, {
      headers: headers,
    });
  }
}

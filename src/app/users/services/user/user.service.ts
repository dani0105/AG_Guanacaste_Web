import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '@enviroment/environment';
import { Observable } from "rxjs/internal/Observable";

const URL = `${environment.api}/users`;

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  public create(body: any): Observable<any> {
    return this.http.post(`${URL}`, body);
  }

  public update(id: number, body: any): Observable<any> {
    return this.http.put(`${URL}/${id}`, body);
  }

  public find(id: number): Observable<any> {
    return this.http.get(`${URL}/${id}`);
  }

  public list(query: any): Observable<any> {
    return this.http.get(`${URL}`, { params: query });
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${URL}/${id}`);
  }

}
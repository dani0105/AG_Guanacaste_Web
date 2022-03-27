import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '@enviroment/environment';
import { Observable } from "rxjs/internal/Observable";

const URL = `${environment.api}/roles`;

@Injectable()
export class RolService {

  constructor(private http: HttpClient) { }

  public list(): Observable<any> {
    return this.http.get(`${URL}`);
  }

  public find(id: number): Observable<any> {
    return this.http.get(`${URL}/${id}`);
  }

}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@enviroment/environment';
import { Observable } from 'rxjs/internal/Observable';

const URL = `${environment.api}/types-tourist-area`;

@Injectable()
export class TypeTouristAreaService {

  constructor(private http: HttpClient) { }


  public find(id: number): Observable<any> {
    return this.http.get(`${URL}/${id}`);
  }

  public list(query: any): Observable<any> {
    return this.http.get(`${URL}`, { params: query });
  }

}

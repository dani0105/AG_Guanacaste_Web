import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@enviroment/environment';

const URL = `${environment.api}/auth`;

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(body: string): Observable<any> {
    return this.http.post(`${URL}/login`, body);
  }

}

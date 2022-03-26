import { Injectable } from '@angular/core';
import { AuthModule } from '../../auth.module';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

const ACCESS_TOKEN = 'access_token'

@Injectable({
  providedIn: AuthModule
})
export class UserService {

  private user: BehaviorSubject<any>;

  public get User(): Observable<any> {
    return this.user.asObservable();
  }

  public get UserValue(): any {
    return this.user.value;
  }

  public set User(user:any){
    this.user.next(user);
  }

  constructor() {
    this.user = new BehaviorSubject<any>(null);
    let access_token = localStorage.getItem(ACCESS_TOKEN);
    this.readJWT(access_token);
  }

  private readJWT(token: string | null) {
    if (token) {
      try {
        this.user.next(jwt_decode(token));
      } catch (Error) {
        console.error('Session expire!');
      }
    }

  }
}

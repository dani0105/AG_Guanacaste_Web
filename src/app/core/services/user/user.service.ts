import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';

const ACCESS_TOKEN = 'access_token'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: BehaviorSubject<any>;

  public get User(): Observable<any> {
    return this.user.asObservable();
  }

  constructor(private jwtHelper: JwtHelperService) {
    this.user = new BehaviorSubject<any>(null);
    let access_token = localStorage.getItem(ACCESS_TOKEN);
    this.readJWT(access_token);
  }

  private readJWT(token: string | null) {
    if (token) {
      try {
        let user = this.jwtHelper.decodeToken(token);
        user.access_token = token;
        this.user.next(user);
      } catch (Error) {
        console.error('Session expire!');
      }
    }
  }

  public setUser(data: any) {
    localStorage.setItem(ACCESS_TOKEN, data.access_token);
    data.user.access_token = data.access_token;
    this.user.next(data.user);
  }

  public verifyToken() {

    if (!this.user.value) {
      return false;
    }

    if (this.jwtHelper.isTokenExpired(this.user.value.access_token)) {
      this.setUser(null);
      return false;
    }

    return true;
  }

  public logout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.user.next(null);
  }

  public getAccessToken(): string {
    return this.user.value.access_token;
  }

  public isLogin():boolean{
    if(this.user.value){
      return true;
    }
    return false;
  }

}

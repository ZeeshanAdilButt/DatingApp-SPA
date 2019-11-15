import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { post } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'https://localhost:44371/api/auth/';

  constructor(private http: HttpClient) { }

  public login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).
      pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
          }
        })
      );
  }


  public register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }
}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: (
    { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
  )
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL + 'users', httpOptions);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseURL + 'users/' + id, httpOptions);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(this.baseURL + 'users/' + id, user, httpOptions);
  }


  setMainPhoto(userId: number, id: number) {
    return this.http.post(this.baseURL + 'users/' + userId + '/photos/' + id + '/setMain', {}, httpOptions);
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseURL + 'users/' + userId + '/photos/' + id, httpOptions);
  }

}

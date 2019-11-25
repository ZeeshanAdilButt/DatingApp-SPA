import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';
import { Message } from '../_models/message';

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

  getUsers(page?, itemsPerPage?, userParams?, likesParam?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      // params = params.append('orderBy', userParams.orderBy);
    }


    if (likesParam === 'Likers') {
      params = params.append('Likers', 'true');
    }

    if (likesParam === 'Likees') {
      params = params.append('Likees', 'true');
    }

    return this.http.get<User[]>(this.baseURL + 'users',
      {
        observe: 'response',
        params,
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
      })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );

    // return this.http.get<User[]>(this.baseURL + 'users', httpOptions);


  }

  sendLike(id: number, recipientId: number) {
    return this.http.post(this.baseURL + 'users/' + id + '/like/' + recipientId, {}, httpOptions);
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

  getMessages(id: number, page?, itemsPerPage?, messageContainer?) {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();

    let params = new HttpParams();

    params = params.append('MessageContainer', messageContainer);

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Message[]>(this.baseURL + 'users/' + id + '/messages',
      {
        observe: 'response',
        params,
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }

          return paginatedResult;
        })
      );
  }


  getMessageThread(id: number, recipientId: number) {
    return this.http.get<Message[]>(this.baseURL + 'users/' + id + '/messages/thread/' + recipientId, httpOptions);
  }

  sendMessage(id: number, message: Message) {
    return this.http.post(this.baseURL + 'users/' + id + '/messages', message, httpOptions);
  }

  deleteMessage(id: number, userId: number) {
    return this.http.post(this.baseURL + 'users/' + userId + '/messages/' + id, {}, httpOptions);
  }

  markAsRead(userId: number, messageId: number) {
    this.http.post(this.baseURL + 'users/' + userId + '/messages/' + messageId + '/read', {}, httpOptions)
      .subscribe();
  }

}

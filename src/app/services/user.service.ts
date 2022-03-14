import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  currentUser = new Subject<any>();
  url =
    'https://notetaker-75b67-default-rtdb.asia-southeast1.firebasedatabase.app/';
  setUser(username: any[]) {
    return this.http.post(this.url + 'users.json', username);
  }
  getUser() {
    return this.http.get(this.url + 'users.json');
  }
}

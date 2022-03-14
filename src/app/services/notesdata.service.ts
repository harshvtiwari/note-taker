import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotesdataService {
  constructor(private http: HttpClient) {}

  url =
    'https://notetaker-75b67-default-rtdb.asia-southeast1.firebasedatabase.app/';

  addNewNote(username: any, newNote: any[]) {
    return this.http.put(this.url + username + '/note.json', newNote);
  }
  getNewNote(username: any) {
    return this.http.get(this.url + username + '/note.json');
  }
  pinnedNotes(username: any, newNote: any) {
    return this.http.put(this.url + username + '/pinned.json', newNote);
  }
  delNotes(username: any, newNote: any) {
    return this.http.put(this.url + username + '/note.json', newNote);
  }
  delPinnedNotes(username: any, newNote: any) {
    return this.http.put(this.url + username + '/pinned.json', newNote);
  }
  otherNotes(newNote: any) {
    return this.http.put(this.url + 'other' + '/note.json', newNote);
  }
  getPinnedNotes(username: any) {
    return this.http.get(this.url + username + '/pinned.json');
  }
  getOtherNotes() {
    return this.http.get(this.url + 'other' + '/note.json');
  }
}

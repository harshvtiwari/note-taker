import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private _users: UserService) {}
  allUsersList: any[] = [];
  addUsersList: any[] = [];
  currentUser = '';
  ngOnInit(): void {
    this.allUsersList = [];
    this._users.getUser().subscribe((data: any) => {
      if (data != null) {
        Object.entries(data).forEach((id: any) => {
          this.allUsersList.push(id[1][0]);
        });
      }
    });
  }
  addUser(newUser: any) {
    this.addUsersList = [];
    if (newUser != '') {
      this.addUsersList.push(newUser.toLowerCase());
      this._users.setUser(this.addUsersList).subscribe((res) => {
        this.ngOnInit();
      });
    }
  }
  selectedIndex: any;
  setCurrentUser(username: any, event: any, index: any) {
    var current = username.toLowerCase();
    this._users.currentUser.next(current);
    this.selectedIndex = index;
  }
}

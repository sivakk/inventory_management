import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  loading = false;
  userTypes = ['admin', 'staff'];
  name: string;
  username: string;
  password: string;

  constructor(private userService: UsersService) {

  }

  users: any[];

  ngOnInit() {
    this.loading = true;
    this.userService.getUsers()
      .subscribe(items => {
        this.users = items;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      });
  }

  addUser(form: NgForm) {
    this.loading = true;

    const newUser = form.value;

    this.userService.addUser(newUser)
      .subscribe(item => {
          this.users.push(item);
          form.reset();
          console.log(this.users);
          setTimeout(() => {
            this.loading = false;
          }, 1000);
      });
  }

  deleteUser(user) {
    this.loading = true;

    const id = user._id;
    const users = this.users;
    this.userService.deleteUser(id).subscribe(data => {

      for (let i = 0; i < users.length; i++) {
        if (users[i]._id === id) {
          users.splice(i, 1);
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        }
      }

    });
  }

}

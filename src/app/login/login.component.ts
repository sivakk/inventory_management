import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';
import { NgForm } from '@angular/forms';
import { Inject } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { EmployeeService } from '../employee.service';

const STORAGE_KEY = 'pure-awesomeness';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // variables
  credentials: any = {};

  constructor(
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private router: Router,
    private loginService: LoginService,
    private employee: EmployeeService
  ) { }

  model: any = {};
  loading = false;
  inventory = 'stockMgmt';
  admin = 'admin';
  staff = 'staff';
  users: any = [];
  errorMsg: string;

  ngOnInit() {
   }

  login(form: NgForm) {
    const loginObj = form.value;

    this.loginService.newLogin(loginObj)
      .subscribe(
        (data) => {
          if (data.status === 404) {
            alert('your login was not found');
          } else {
            if (data.token) {
              data.user_data.token = data.token;
              this.storage.set('logged_in', data.user_data.username);
              this.employee.setLoggedIn(true);
              if (data.user_data.type === 'super-admin') {
                console.log('present user is declared super admin');
                this.storage.set(data.user_data.type, data.user_data);
                this.router.navigate([this.inventory]);
              } else if (data.user_data.type === 'admin') {
                this.storage.set('logged_in_admin', data.user_data.username);
                this.storage.set(data.user_data.username, data.user_data);
                this.router.navigate([this.admin]);
              } else if (data.user_data.type === 'staff') {
                this.storage.set('logged_in_staff', data.user_data.username);
                this.storage.set(data.user_data.username, data.user_data);
                this.router.navigate([this.staff]);
              }
            }

          }
        },
        (err) => {
          console.log('got error', err);
          alert(err);
          this.errorMsg = <any>err;
        }
      );

  }
}

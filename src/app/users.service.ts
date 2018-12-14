import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

// additional modules import
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// importing other services
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: Http,
    private login: LoginService
  ) {
    console.log('User Service Initialized...');
  }

  private user_data = this.login.getLoggedInUserData();
  private token = this.user_data.token;

  mdb = '/api/users/';

  getUsers() {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.mdb, options)
      .pipe(map(res => res.json()));
  }

  addUser(newItem) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.mdb + 'addUser', JSON.stringify(newItem), options)
      .pipe(map(res => res.json()));
  }

  deleteUser(id) {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.token);
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(this.mdb + 'delUser/' + id, options)
      .pipe(map(res => res.json()));
  }

}

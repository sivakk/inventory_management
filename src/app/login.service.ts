import { Inject, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

// additional modules import
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// importing other services

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: Http,
    @Inject(SESSION_STORAGE) private storage: StorageService,
  ) {  }

  mdb = '/api/login/';

  getLoggedInUserData() {
    const logged_in_user = this.storage.get('logged_in');
    const user_data = this.storage.get(logged_in_user);
    return user_data;
  }

  getToken() {
    const data = this.getLoggedInUserData();
    if (!data) {
      return '';
    } else {
      return data.token;
    }
  }

  getCreds() {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.getToken());
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.mdb, options)
      .pipe(map(res => res.json()));
  }

  newLogin(newItem) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.getToken());
    return this.http.post(this.mdb + 'newLogin', JSON.stringify(newItem), { headers: headers })
      .pipe(map(res => res.json()));
  }

  isLogged() {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.getToken());
    const current_user = this.storage.get('logged_in');
    console.log('current user is login service', current_user);
      return current_user !== null;
  }
}

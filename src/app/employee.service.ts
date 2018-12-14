import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

interface IsLoggedIn {
  status: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private loggedInStatus = false;
  private mdb = 'api/login/isLogged';

  constructor(
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private login: LoginService,
    private http: Http,
    private router: Router,
  ) { }

  setLoggedIn(value) {
    this.loggedInStatus = value;
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }

  isLogged(): Observable<any> {
    const current_user = this.storage.get('logged_in');
    const current_user_data = this.storage.get(current_user);
    if (current_user) {
      const token = current_user_data.token;
      const headers = new Headers();
      headers.append('Authorization', 'Bearer ' + token);
      return this.http.get(this.mdb, { headers: headers }).pipe(map(res => {
        return res.json();
      }));
    } else {
      this.router.navigate(['/login']);
      return Observable.create(observer => {
        observer.next('false');
        observer.complete();
    });
    }
  }
}

import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

// import decode from 'jwt-decode';
@Injectable()
export class AuthService {
  private mdb = 'api/login/isLogged';

  constructor(
    @Inject(SESSION_STORAGE) private storage: StorageService,
    private http: Http,
    private router: Router
  ) {

  }
  public getToken(): string {
    const logged_in_user = this.storage.get('logged_in');
    const user_data = this.storage.get(logged_in_user);
    return user_data.token;
  }
  public isAuthenticated(): Observable<any> {
    const token = this.getToken();
    console.log('current token', token);
    if (token) {
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

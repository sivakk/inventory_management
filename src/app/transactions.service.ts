import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';

// additional modules import
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// importing other services
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private mdb = '/api/transactions/';

  constructor(
    private login: LoginService,
    private http: Http
  ) {
    console.log('Transactions Service Initialized...');
  }

  private user_data = this.login.getLoggedInUserData();
  private token = this.user_data.token;

  private logged_user = this.user_data.database_name;

  getInvestments() {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.mdb + 'investments', options)
        .pipe(map(res => res.json()));
  }

   addNewInvestment(newInvestment) {
    const headers = new Headers();
     headers.append('Content-Type', 'application/json');
     headers.append('Authorization', 'Bearer ' + this.token);
     const options = new RequestOptions({ headers: headers });
     return this.http.post(this.mdb + 'addInvestment', JSON.stringify(newInvestment), options)
      .pipe(map(res => res.json()));
  }

  deleteInvestment(id) {
    if (!id) {
      return Observable.create(observer => {
        observer.next('false');
        observer.complete();
      });
    } else {
      const headers = new Headers();
      headers.append('Authorization', 'Bearer ' + this.token);
      const options = new RequestOptions({ headers: headers });
      return this.http.delete(this.mdb + 'delInvestment/' + id, options)
        .pipe(map(res => res.json()));
    }
  }
}

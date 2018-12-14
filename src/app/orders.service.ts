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
export class OrdersService {

  constructor(
    private http: Http,
    private login: LoginService
  ) {
    console.log('Kitchen Service Initialized...');
   }

  mdb = '/api/order/';
  private user_data = this.login.getLoggedInUserData();
  private token = this.user_data.token;

  getLoggedInUserData() {
    return this.user_data;
  }

  getOrders() {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.mdb, options)
        .pipe(map(res => res.json()));
  }

  addOrder(newItem) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.mdb + 'addOrder', JSON.stringify(newItem), options)
      .pipe(map(res => res.json()));
  }

  updateOrder(item) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.mdb + 'updateOrder/' + item._id, JSON.stringify(item), options)
      .pipe(map(res => res.json()));
  }

  deleteOrder(id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    const options = new RequestOptions({ headers: headers });
    console.log('deleteing ktichen item', JSON.stringify(id), options);
    return this.http.delete(this.mdb + 'delOrder/' + id)
      .pipe(map(res => res.json()));
  }
}

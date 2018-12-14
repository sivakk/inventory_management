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
export class CartService {

  constructor(
    private http: Http,
    private login: LoginService,
  ) {
    console.log('User Service Initialized...');
   }

  mdb = '/api/cart/';

  getCarts() {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.login.getToken());
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.mdb, options)
        .pipe(map(res => res.json()));
  }

  addCart(cart) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.login.getToken());
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.mdb + 'addcart', JSON.stringify(cart), options)
      .pipe(map(res => res.json()));
  }
}

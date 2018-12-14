import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { LoginService } from './login.service';
import { RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';


// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

export interface StockItem {
  stock_name: string;
  stock_measuring_unit: string;
  stock_unit_cost: number;
  stock_quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    private http: Http,
    private login: LoginService,
    private httpC: HttpClient
  ) {
    console.log('Task Service Initialized...');
  }

  private user_data = this.login.getLoggedInUserData();
  private token = this.user_data.token;

  private mdb = '/api/stock/';
  private logged_user = this.user_data.database_name;

  getLoggedInUserData() {
    return this.user_data;
  }

  getStock() {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.token);
    const options = new RequestOptions({ headers: headers });
    /** here we set the specific user data to be fetched */
    return this.http.get(this.mdb + 'getStock', options)
      .pipe(map(res => res.json()));
  }

  getAdminStock() {
    /** here we set the specific user data to be fetched */
    return this.httpC.get('api/stock/getAdminStock');
      // .pipe(map(res => res.json()));
  }

  addStock(newItem) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.mdb + 'addStock', JSON.stringify(newItem), options)
      .pipe(map(res => <StockItem>res.json()));
  }

  deleteStock(id) {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.token);
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(this.mdb + 'delStock/' + id, options)
      .pipe(map(res => res.json()));
  }

  updateStock(item) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.mdb + 'updateStock/' + item._id, JSON.stringify(item), options)
      .pipe(map(res => res.json()));
  }

  editStock(item) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.mdb + 'editStockItem/' + item._id, JSON.stringify(item), options)
      .pipe(map(res => res.json()));
  }
}

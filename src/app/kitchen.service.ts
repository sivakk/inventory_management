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
export class KitchenService {

  constructor(
    private http: Http,
    private login: LoginService,
  ) {
    console.log('Kitchen Service Initialized...');
  }

   mdb = '/api/kitchen/';

  getKitchenItems() {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.login.getToken());
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.mdb, options)
        .pipe(map(res => res.json()));
  }

  addKitchenItem(newItem) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.login.getToken());
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.mdb + 'addBox', JSON.stringify(newItem), options)
      .pipe(map(res => res.json()));
  }

  updateTotalCost(item) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.login.getToken());
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.mdb + 'updateTotalCost/', JSON.stringify(item), options)
    .pipe(map(res => res.json()));
  }


  /** update the raw cost of the kitchen item */
  updateKitchenItem(item) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.login.getToken());
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.mdb + 'updateKitchenItem/', JSON.stringify(item), options)
    .pipe(map(res => res.json()));
  }

  updateKitchenIngredient(item, id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.login.getToken());
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.mdb + 'updateKitchenIngredients/' + id, JSON.stringify(item), options)
    .pipe(map(res => res.json()));

  }

  deleteKitchenItem(id) {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.login.getToken());
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(this.mdb + 'delKitchenItem/' + id, options)
      .pipe(map(res => res.json()));
  }
}

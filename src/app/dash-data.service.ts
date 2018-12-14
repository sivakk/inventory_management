import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import { RequestOptions } from '@angular/http';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class DashDataService {

  constructor(private http: Http,
    private login: LoginService
  ) {
  }

  private user_data = this.login.getLoggedInUserData();
  private token = this.user_data.token;

  dataUrl = '/api/dash/';

  getData() {
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.token);
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.dataUrl + 'data', options)
            .pipe(map((res: any) => res));
}

}

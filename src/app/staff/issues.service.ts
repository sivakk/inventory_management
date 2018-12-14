import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { map, filter, scan } from "rxjs/operators";
import { Router } from "@angular/router";

import { Issue } from "./issue";
import { Times } from "./time";


@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  private issue: Issue[] = [];
  private time: Times[] = [];

  constructor(private http: Http, private router: Router) { }

  onload(values: any, jobstarted: any, jobupdatetime: string, jobended: any, jobdone: any) {
    var obj = {
      values: values,
      jobstarted: jobstarted,
      jobupdatetime: jobupdatetime,
      jobended: jobended,
      jobdone: jobdone
    };
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:3000/api/time/post_route", obj, {
        headers: headers
      })
      .pipe(map(res => res.json()));
  }

  updateonload(date: string, jobstarted: string, jobstarttime: string) {
    console.log(date, jobstarted);

    var obj = {
      date: date,
      jobstarted: jobstarted,
      jobstarttime: jobstarttime,

    };
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .put("http://localhost:3000/api/time/putroute/", obj, {
        headers: headers
      })
      .pipe(map(res => res.json()));
  }

  addstoptime(date: string, jobendtime: string, jobended: any) {
    console.log(jobendtime);

    var obj = {
      date: date,
      jobendtime: jobendtime,
      jobended: jobended

    };
    console.log(obj);

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .put("http://localhost:3000/api/time/putroutestoptime/", obj, {
        headers: headers
      })
      .pipe(map(res => res.json()));

  }

  totalTime(date: string, jobdone: any) {
    console.log(jobdone);

    var obj = {
      date: date,
      jobdone: jobdone

    };
    console.log(obj);

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .put("http://localhost:3000/api/time/putroutetotaltime/", obj, {
        headers: headers
      })
      .pipe(map(res => res.json()));

  }

  getonload() {
    return this.http
      .get("http://localhost:3000/api/time/time")
      .pipe(map(res => res.json()));
  }



  addIssue(newIssue) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http
      .post("http://localhost:3000/api/issues/post_route", newIssue, {
        headers: headers
      })
      .pipe(map(res => res.json()));
  }


  getIssues() {
    return this.http
      .get("http://localhost:3000/api/issues/test")
      .pipe(map(res => res.json()));
  }

  
}

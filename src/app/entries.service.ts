import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {

  constructor(private http:Http) { 
    console.log('Entry Service Initialized...');
   }

   mdb: string = '/api/entries/'

   getEntries(){
    return this.http.get(this.mdb)
         .pipe(map(res => res.json()));
   }

   addEntry(newItem) {
    var headers = new Headers();

    console.log("$$$$$$$$", newItem)
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.mdb+'addEntry', JSON.stringify(newItem), {headers: headers})
      .pipe(map(res => res.json()))
  }



}






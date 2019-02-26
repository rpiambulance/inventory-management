import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Inventory } from './inventory';
@Injectable({
  providedIn: 'root'
})
export class GetInventoriesService {

  constructor(private http: HttpClient) { }

  getInventories(): Observable<Inventory[]> {

    return this.http.get<any>('http://localhost:3000/mock').pipe(map(res => {
      const inventories = [];
      res = res.inventories;
      console.log(res);
      for (let i = 0; i < res.length; i++) {
        inventories[i] = new Inventory(res[i]);
        console.log(res[i]);
      }
      return inventories;
    }));
  }
}

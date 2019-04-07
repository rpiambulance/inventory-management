import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Item } from './item';
import { Inventory } from './inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  getInventories(): Observable<Inventory[]> {

    return this.http.get<any>('http://localhost:3000/api/inventory').pipe(map(res => {
      const inventories = [];
      res = res.inventories;
      for (let i = 0; i < res.length; i++) {
        inventories[i] = new Inventory(res[i]);
      }
      return inventories;
    }));
  }

  getInventory(id: string): Observable<any>{
    let requestUrl = 'http://localhost:3000/api/inventory?id=' + id;
    return this.http.get<any>(requestUrl);
  }

  createInventory(inv: Inventory): Observable<any> {
    return this.http.post('http://localhost:3000/inventory/create', inv);
  }

  addItem(inv: Inventory, itemsArray: Item[]): Observable<Inventory> {
    return this.http.post<Inventory>('http://localhost:3000/inventory/additem', {inventory: inv, items: itemsArray});
  }

  addPerson(inv: Inventory, newPerson: string): Observable<any> {
    return this.http.post('http://localhost:3000/inventory/' + inv.id + '/add', { user: newPerson });
  }

  removePerson(inv: Inventory, newPerson: string): Observable<any> {
    return this.http.post('http://localhost:3000/inventory/' + inv.id + '/remove', { user: newPerson });
  }
}

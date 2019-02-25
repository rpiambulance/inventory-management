import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from './inventory';
@Injectable({
  providedIn: 'root'
})
export class GetInventoriesService {

  constructor(private http: HttpClient) { }

  getInventories(): Observable<Inventory[]> {

    return this.http.get<Inventory[]>('http://localhost:3000/mock');
  }
}

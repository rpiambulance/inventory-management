import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetUsersService {

  constructor(private http: HttpClient) { }
  // used to get all the users of the system
  getUsers(): Observable<User[]> {
    return this.http.get<any>('http://localhost:3000/api/users').pipe(map(res => {
      return res;
    }));
  }
}

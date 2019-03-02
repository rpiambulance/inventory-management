import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(usr: User): Observable<any> {
    return this.http.post('http://localhost:3000/user/create', usr);
  }

  authenticateUser(usr: User): Observable<any> {
    return this.http.post('http://localhost:3000/user/login', usr);
  }

  getUser(token: string): Observable<any> {
    return this.http.post('http://localhost:3000/user/get', {token});
  }
}

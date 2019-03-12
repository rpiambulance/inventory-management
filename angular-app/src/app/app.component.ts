import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private authServ: AuthService) {}
  title = 'Inventory Meme System';
  loggedIn = localStorage.getItem('auth_token') != null;

  logoutUser():void {
    this.authServ.logout();
    this.router.navigate(['login']);
  }

  changeOfRoutes():void {
    // we must check on every route change for the navbar to update
    this.loggedIn = localStorage.getItem('auth_token') != null;
  }
}

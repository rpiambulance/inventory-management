import { Component } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor() { }

  model: User = new User('', '', '', '', '');
  onSubmit(): void {
    // We will do the actual submission of the form here
    console.log('Submitted!');
    return null;
  }

}

import { Component } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  signinError: string;
  signinSuccess: boolean;
  constructor(private authServ: AuthService, public router: Router) {
    this.signinSuccess = true;
  }

  model: User = new User('', '', '', '', '');
  onSubmit(): void {
    // We will do the actual submission of the form here
    console.log('Submitted!');
    this.authServ.authenticateUser(this.model).subscribe((response) => {
      this.signinError = response.error;
      this.signinSuccess = response.success;
      if (response.success) {
        // Signed in successfully we add the response token
        localStorage.setItem('auth_token', response.token);
        this.router.navigate(['inventory']);
      }
    });
    return null;
  }

}

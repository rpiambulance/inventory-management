import { Component } from '@angular/core';
import { FormBuilder, AbstractControl} from '@angular/forms';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerSuccess: boolean;
  errorMessage: string;
  constructor(private fb: FormBuilder, private authServ: AuthService, private router: Router) {
    // Initializes them to not be null
    this.registerSuccess = true;
    this.errorMessage = '';
  }
  // This looks awfully familiar to the login form, but some minor differences in submission
  model: User = new User('', '', '', '', '');
  registerForm = this.fb.group({
    userName: [''],
    password: [''],
    confirmPassword: [''],
    firstName: [''],
    lastName: [''],
    emailAddress: ['']
  }, {validator: passwordsMatch});

  onSubmit(): void {
    // We will do the actual submission of the form here
    console.log('Submitted!');
    this.model.userName = this.registerForm.get('userName').value;
    this.model.password = this.registerForm.get('password').value;
    this.model.firstName = this.registerForm.get('firstName').value;
    this.model.lastName = this.registerForm.get('lastName').value;
    this.model.email = this.registerForm.get('emailAddress').value;
    // Add the items and close the modal
    this.authServ.registerUser(this.model).subscribe((response) => {
      this.registerSuccess = response.success;
      this.errorMessage = response.error;
      this.router.navigate(['login']);
    });
    return null;
  }

}


// Custom validator to ensure passwords match
export function passwordsMatch(c: AbstractControl) {
  if (!c.get('password').value || !c.get('confirmPassword').value) { return null; }
  if (c.get('password').value !== c.get('confirmPassword').value) {
    c.get('confirmPassword').setErrors({MatchPassword: true});
  } else {
    return null;
  }
}

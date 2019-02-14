import { Component } from '@angular/core';
import { FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private fb: FormBuilder) { }
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
    return null;
  }

}


// Custom validator to ensure passwords match
export function passwordsMatch(c: AbstractControl) {
  if (!c.get('password').value || !c.get('confirmPassword').value) { return null; }
  if (c.get('password').value !== c.get('confirmPassword').value) {
    console.log('Password: ' + c.get('password').value);
    console.log('Confirmed: ' + c.get('confirmPassword').value);
    c.get('confirmPassword').setErrors({MatchPassword: true});
  } else {
    return null;
  }
}

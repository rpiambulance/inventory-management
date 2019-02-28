import { Component } from '@angular/core';
import { Inventory } from '../inventory';
import { currentUser } from '../mock-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-inv-form',
  templateUrl: './new-inv-form.component.html',
  styleUrls: ['./new-inv-form.component.css']
})
export class NewInvFormComponent {

  constructor(public router: Router) { }

  // We can only have one inventory in JavaScript so we must make an object
  model: Inventory = new Inventory({items: [], name: '', people: [currentUser]});

  onSubmit(): void {
    // We will do the actual submission of the form here
    console.log('Submitted!');
    console.log(this.model);
    this.router.navigate(['inventory']);
    return null;
  }

}

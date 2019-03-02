import { Component } from '@angular/core';
import { Inventory } from '../inventory';
import { InventoryService } from '../inventory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-inv-form',
  templateUrl: './new-inv-form.component.html',
  styleUrls: ['./new-inv-form.component.css']
})
export class NewInvFormComponent {

  constructor(public router: Router, private invService: InventoryService) { }

  // We will decode the token later
  model: Inventory = new Inventory({items: [], name: '', people: []});

  onSubmit(): void {
    // If you try to do this not on submit the weird async nature causes errors
    this.model.people.push(localStorage.getItem('auth_token'));
    this.invService.createInventory(this.model).subscribe((response) => {
      if (!response.success) {
        // If there's an error make the user login again
        localStorage.removeItem('auth_token');
        this.router.navigate(['login']);
      }
    });
    this.router.navigate(['inventory']);
    return null;
  }

}

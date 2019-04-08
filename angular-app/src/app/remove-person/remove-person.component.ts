import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Inventory } from '../inventory';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GetUsersService } from '../get-users.service';
import { InventoryService } from '../inventory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-remove-person',
  templateUrl: './remove-person.component.html',
  styleUrls: ['./remove-person.component.css']
})
export class RemovePersonComponent {

  removePersonForm: FormGroup;
  users: any;
  inv: Inventory;
  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private userService: GetUsersService,
              private invService: InventoryService, private router: Router) {
    this.removePersonForm = new FormGroup({
      user: new FormControl('')
    });
    // get the inventory data because asynchronous JS
    this.invService.getInventory(window.location.pathname.split('/')[2]).subscribe((response) => {
      console.log(response);
      this.users = response.inventory.people;
      this.inv = new Inventory(response.inventory);

      // remove the owner's name from list of possible people to remove
      const index = this.users.indexOf(this.inv.owner);
      if (index !== -1) { this.users.splice(index, 1); }
    });
  }
  onSubmit(): void {
    console.log('Submitted');

    const person = this.removePersonForm.controls.user.value;

    // make the post request to remove the person
    this.invService.removePerson(this.inv, person).subscribe((response) => {
      this.activeModal.close();
    });
  }

}

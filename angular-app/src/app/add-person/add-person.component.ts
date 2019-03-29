import { Component, OnInit } from '@angular/core';
import { Inventory } from '../inventory';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GetUsersService } from '../get-users.service';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent {

  addPersonForm: FormGroup;
  users: any;
  inv: Inventory;
  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private userService: GetUsersService,
              private invService: InventoryService) {
    this.addPersonForm = new FormGroup({
      // just 1 parameter for the user to add
      user: new FormControl('')
    });
    this.userService.getUsers().subscribe((userResponse) => {
      this.users = userResponse.users;
      this.users = this.users.map(a => a.userName);
      // console.log("the people are " + this.inv.people);
      for (const user of this.inv.people) {
        if (this.users.includes(user)) {
          const index = this.users.indexOf(user);
          if (index !== -1) { this.users.splice(index, 1); }
        }
      }
    });
  }

  onSubmit(): void {
    console.log('Submitted');

    const newPerson = this.addPersonForm.controls.user.value;

    // if the person already exists, don't add
    if (this.inv.people.includes(newPerson)) {
      alert('ERROR: User already has permission');
      return;
    }

    // update the current inv to reflect the change without needing to refresh
    this.inv.people = this.inv.people.concat(newPerson);

    // make the post request to add the new person
    this.invService.addPerson(this.inv, newPerson).subscribe((response) => {
      this.activeModal.close();
    });
  }
}

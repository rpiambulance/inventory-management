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
      this.users = userResponse;
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

    // make the post request to add the new person
    this.invService.addPerson(this.inv, newPerson).subscribe((response) => {
      console.log(response);
      this.activeModal.close();
    });


  }
}

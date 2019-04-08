import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Inventory } from '../inventory';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GetUsersService } from '../get-users.service';
import { InventoryService } from '../inventory.service';

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
              private invService: InventoryService) {
    this.removePersonForm = new FormGroup({
      user: new FormControl('')
    });
    this.userService.getUsers().subscribe((userResponse) => {
      this.users = userResponse.users;
      this.users = this.users.map(a => a.userName);

      // for (const user of this.inv.people) {
      //   if (this.users.includes(user)) {
      //     const index = this.users.indexOf(user);
      //     if (index !== -1) { this.users.splice(index, 1); }
      //   }
      // }
    });
  }
  
  onSubmit(): void {
    console.log('Submitted');

    const person = this.removePersonForm.controls.user.value;

    
  }

}

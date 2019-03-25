import { Component, OnInit } from '@angular/core';
import { Inventory } from '../inventory';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GetUsersService } from '../get-users.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent {

  addPersonForm: FormGroup;
  users: any;
  inv: Inventory;
  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private userService: GetUsersService) {
    this.addPersonForm = this.fb.group({
    }, {});
    this.userService.getUsers().subscribe((userResponse) => {
      this.users = userResponse;
      console.log(this.users);
    });
    // Just so this.items isn't null
    // this.items = this.addItemForm.get('items') as FormArray;
  }

  onSubmit(): void {
    console.log('submitted');
  }
}

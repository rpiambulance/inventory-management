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
export class RemovePersonComponent implements OnInit {

  removePersonForm: FormGroup;
  users: any = [];
  inv: Inventory;
  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private userService: GetUsersService,
              private invService: InventoryService, private router: Router) {
    this.removePersonForm = new FormGroup({
      user: new FormControl('')
    });
  }

  ngOnInit(): void {
    for (const user of this.inv.people) {
      this.users.push(user);
    }
    // remove the owner's name from list of possible people to remove
    const index = this.users.indexOf(this.inv.owner);
    if (index !== -1) { this.users.splice(index, 1); }
  }

  onSubmit(): void {
    const person = this.removePersonForm.controls.user.value;
    this.inv.people.splice(this.inv.people.indexOf(person), 1);
    // make the post request to remove the person
    this.invService.removePerson(this.inv, person).subscribe((response) => {
      this.activeModal.close();
    });
  }
}

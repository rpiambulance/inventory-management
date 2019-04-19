import { Component } from '@angular/core';
import { Inventory } from '../inventory';
import { InventoryService } from '../inventory.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-remove-inventory',
  templateUrl: './remove-inventory.component.html',
  styleUrls: ['./remove-inventory.component.css']
})
export class RemoveInventoryComponent  {

  removeInventoryForm: FormGroup;
  removableInventories: Inventory[] = [];
  invs: any;
  // inv: Inventory[];
  loggedIn: User;
  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal,
              private authService: AuthService, private invService: InventoryService) {
    this.removeInventoryForm = new FormGroup({
      inv: new FormControl('')
    });

    // getting the currently logged in user
    this.authService.getUser(localStorage.getItem('auth_token')).subscribe(response => {
      this.loggedIn = response.user;
      console.log(this.loggedIn);
    });

    // getting all the inventories the user is the owner of
    this.invService.getInventories().subscribe((response) => {
      for (const inv of response) {
        console.log(inv);
        if (inv.owner === this.loggedIn.userName) {
          this.removableInventories.push(inv);
        }
      }
      this.invs = this.removableInventories.map(a => a.name);
    });
  }

  // press the button
  onSubmit(): void {
    let inventory;
    const toRemove = this.removeInventoryForm.controls.inv.value;

    // match the selected string to the inventory
    for (const inv of this.removableInventories) {
      if (toRemove === inv.name) {
        inventory = inv;
      }
    }


    // current does not work, later issue
    // temporary work around is the location.reload() line

    // this.invs = this.invs.splice(this.invs.indexOf(toRemove));

    this.invService.removeInventory(inventory).subscribe((response) => {
      this.activeModal.close();
      location.reload();
    });

  }


}

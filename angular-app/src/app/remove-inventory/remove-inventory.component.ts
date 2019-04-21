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
  displayedInventories: Inventory[];
  loggedIn: User;
  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal,
              private authService: AuthService, private invService: InventoryService) {
    this.removeInventoryForm = new FormGroup({
      inv: new FormControl('')
    });

    // getting the currently logged in user
    this.authService.getUser(localStorage.getItem('auth_token')).subscribe(response => {
      this.loggedIn = response.user;
      // getting all the inventories the user is the owner of (must be nested or getUser might not return in time)
      this.invService.getInventories().subscribe((response) => {
        for (const inv of response) {
          if (inv.owner === this.loggedIn.userName) {
            this.removableInventories.push(inv);
          }
        }
      });
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

    this.invService.removeInventory(inventory).subscribe((response) => {
      let index = -1;
      // Had to make own indexOf based on name property because it kept returning -1
      for(let i = 0; i < this.displayedInventories.length; i++){
        if(this.displayedInventories[i].name == inventory.name){
          index = i;
          break;
        }
      }
      this.displayedInventories.splice(index, 1);
      // We then pass the inventory back to be removed
      this.activeModal.close(this.displayedInventories);
    });

  }


}

import { Component, OnInit } from '@angular/core';
import { Inventory } from '../inventory';
import { User } from '../user';
import { currentUser, MOCK_USERS } from '../mock-data';
import { GetInventoriesService } from '../get-inventories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  // list of sample users
  users: User[] = MOCK_USERS;
  samplePerson: Inventory;

  loggedIn = currentUser;
  // the initial store of raw data
  inventoriesJSON: Inventory[];
  // the inventories that loggedIn has access to
  loggedInInventories: object[] = [];

  // for later...
  selectedInventory: string;

  constructor(private data: GetInventoriesService, public router: Router) { }

  ngOnInit() {

    // get the data from the server
    this.data.getInventories().subscribe(data => {
      this.inventoriesJSON = data;
      for (const inv of this.inventoriesJSON) {
        // add the inventories that the user has access to
        // TODO: clean up
        if (inv.people.includes(currentUser)) {
          this.loggedInInventories.push(inv);
        }
      }
    });
  }

  // for later...
  onSelect(inventory: string): void {
    this.selectedInventory = inventory;
  }

  newInvButtonClick(): void {
    this.router.navigate(['newInvForm']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Inventory } from '../inventory';
import { User } from '../user';
import { currentUser, MOCK_USERS } from '../mock-data';
import { InventoryService } from '../inventory.service';
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
  loggedInInventories: Inventory[] = [];

  constructor(private data: InventoryService, public router: Router) { }

  ngOnInit() {

    // get the data from the server
    this.data.getInventories().subscribe(data => {
      this.inventoriesJSON = data;
      console.log(this.inventoriesJSON);
      for (const inv of this.inventoriesJSON) {
        // Includes woudln't work with the new object model so we do a manual compare
        for (const people of inv.people) {
          if (people.userName === this.loggedIn.userName) {
            this.loggedInInventories.push(inv);
          }
        }
      }
    });
  }

  newInvButtonClick(): void {
    this.router.navigate(['newInvForm']);
  }
}

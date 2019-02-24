import { Component, OnInit } from '@angular/core';
import { Inventory } from '../inventory';
import { User } from '../user';
import { currentUser, MOCK_USERS } from '../mock-data';
import { GetInventoriesService } from '../get-inventories.service';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  //list of sample users
  users: User[] = MOCK_USERS;
  samplePerson: Inventory;

  //the initial store of raw data
  inventoriesJSON: Object;
  
  //the inventories that loggedIn has access to
  loggedInInventories: Object[] = [];
  

  //for later...
  selectedInventory: string;

  constructor(private data: GetInventoriesService) { }

  ngOnInit() {

    //get the data from the server
    this.data.getInventories().subscribe(data => {
      this.inventoriesJSON = data.inventories;
      for (var i = 0; i < this.inventoriesJSON.length; i++){
        //add the inventories that the user has access to
        //TODO: clean up
        if (this.inventoriesJSON[i].access.includes(this.loggedIn)) {
          this.loggedInInventories.push(this.inventoriesJSON[i]);
        }
        
      }
      console.log(this.loggedInInventories);
    })
  }

  //for later...
  onSelect(inventory: string): void {
    this.selectedInventory = inventory;
  }

}


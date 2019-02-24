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

  users: User[] = MOCK_USERS;
  loggedIn = currentUser
  samplePerson: Inventory;

  inventoriesJSON: Object;
  
  loggedInInventories: Object[] = [];
  
  
  selectedInventory: string;

  constructor(private data: GetInventoriesService) { }

  ngOnInit() {
    this.data.getInventories().subscribe(data => {
      this.inventoriesJSON = data.inventories;
      for (var i = 0; i < this.inventoriesJSON.length; i++){
        if (this.inventoriesJSON[i].access.includes(this.loggedIn)) {
          this.loggedInInventories.push(this.inventoriesJSON[i]);
        }
        
      }
      console.log(this.loggedInInventories);
    })
  }

  onSelect(inventory: string): void {
    this.selectedInventory = inventory;
  }

}


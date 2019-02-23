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

  inventoriesJSON:Object;
  
  
  inventories:Array<string> = ['Inventory1', 'Ambulance', 'Groceries', 'House Supplies', 'Random stuff'];
  selectedInventory: string;

  constructor(private data: GetInventoriesService) { }

  ngOnInit() {
    this.data.getInventories().subscribe(data => {
      this.inventoriesJSON = data;
      console.log(this.inventoriesJSON);
    })
    // this.samplePerson = new Inventory();
    // this.samplePerson.items = {
    //   "tomatoes":10,
    //   "lettuce": 10,
    //   "corn": 20,
    //   "medical supplies": 100,
    //   "pencils": 100,
    //   "computers": 1,
    //   "misc": 30
    //   }
  }

  onSelect(inventory: string): void {
    this.selectedInventory = inventory;
  }

}


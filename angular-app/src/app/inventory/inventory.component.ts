import { Component, OnInit } from '@angular/core';
import { Inventory } from '../inventory';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  samplePerson: Inventory;
  
  
  inventories:Array<string> = ['Inventory1', 'Ambulance', 'Groceries', 'House Supplies', 'Random stuff'];
  selectedInventory: string;

  constructor() { }

  ngOnInit() {
    this.samplePerson = new Inventory();
    this.samplePerson.items = {
      "tomatoes":10,
      "lettuce": 10,
      "corn": 20,
      "medical supplies": 100,
      "pencils": 100,
      "computers": 1,
      "misc": 30
      }
  }

  onSelect(inventory: string): void {
    this.selectedInventory = inventory;
  }

}


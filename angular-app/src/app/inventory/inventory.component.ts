import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  inventories:Array<string> = ['Inventory1', 'Ambulance', 'Groceries', 'House Supplies', 'Random stuff'];
  selectedInventory: string;

  constructor() { }

  ngOnInit() {
  }

  onSelect(inventory: string): void {
    this.selectedInventory = inventory;
  }

}

export class Inventory {

  name: string;
  people: Array<string>;
}

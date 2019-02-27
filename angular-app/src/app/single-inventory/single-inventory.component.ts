import { Component, OnInit, Input } from '@angular/core';
import { Inventory } from '../inventory';
import { InventoryComponent } from '../inventory/inventory.component';
import { currentUser, MOCK_USERS } from '../mock-data';
import { GetInventoriesService } from '../get-inventories.service';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-inventory',
  templateUrl: './single-inventory.component.html',
  styleUrls: ['./single-inventory.component.css']
})
export class SingleInventoryComponent implements OnInit {

  inventoriesJSON: Inventory[];
  inv: string;
  thisInv: Inventory;
  @Input() user: string;
  constructor(private route: ActivatedRoute, private data: GetInventoriesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.inv = params.get('name');
    });
    // get the data from the server
    this.data.getInventories().subscribe(data => {
      this.inventoriesJSON = data;
      for (const inv of this.inventoriesJSON) {
        if (inv.name === this.inv) {
          this.thisInv = new Inventory(inv);
        }
      }
    });
  }

}

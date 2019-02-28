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

  // name of inventory
  name: string;

  // local copy of inventory contents
  thisInv: Inventory;

  // ActivatedRoute for query params
  // GetInventoryService for mock data
  constructor(private route: ActivatedRoute, private data: GetInventoriesService) { }

  ngOnInit() {

    // getting the name of the inventory to display
    this.route.paramMap.subscribe(params => {

      this.name = params.get(`name`);
      // fetch all inventories
      this.data.getInventories().subscribe(data => {

        // for every inventory
        for (const inv of data) {
          if (inv.name === this.name) {
            // found the inventory
            // TODO: else case in case inv not found
            this.thisInv = new Inventory(inv);
          }
        }
      });
    });
  }

}

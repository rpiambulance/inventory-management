import { Component, OnInit, Input } from '@angular/core';
import { Inventory } from '../inventory';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventoryComponent } from '../inventory/inventory.component';
import { currentUser, MOCK_USERS } from '../mock-data';
import { GetInventoriesService } from '../get-inventories.service';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { AddItemFormComponent } from '../add-item-form/add-item-form.component';

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

  // This is the form that we will use to add items to an inventory
  addItemForm: AddItemFormComponent;

  // ActivatedRoute for query params
  // GetInventoryService for mock data
  constructor(private route: ActivatedRoute, private data: GetInventoriesService, private modal: NgbModal) { }

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
            break;
          }
        }
      });
    });
  }

  // Opens up the add item form modal
  openAddItemForm(): void {
    const openModal = this.modal.open(AddItemFormComponent, {size: 'lg'});
    // Passes inventory onto the add item config so they can be added to the correct inv
    openModal.componentInstance.inv = this.thisInv;
  }

}

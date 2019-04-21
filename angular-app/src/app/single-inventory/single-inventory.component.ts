import { Component, OnInit, Input } from '@angular/core';
import { Inventory } from '../inventory';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventoryService } from '../inventory.service';
import { ActivatedRoute } from '@angular/router';
import { AddItemFormComponent } from '../add-item-form/add-item-form.component';
import { AddPersonComponent } from '../add-person/add-person.component';
import { RemovePersonComponent } from '../remove-person/remove-person.component';
import { TakeinventoryComponent } from '../takeinventory/takeinventory.component';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { UpdatequantityComponent } from '../updatequantity/updatequantity.component';

@Component({
  selector: 'app-single-inventory',
  templateUrl: './single-inventory.component.html',
  styleUrls: ['./single-inventory.component.css']
})
export class SingleInventoryComponent implements OnInit {

  // name of inventory
  id: string;

  // The user currently logged in 
  loggedIn: User = new User('', '', '' , '', '');

  // local copy of inventory contents
  thisInv: Inventory = new Inventory({items: [], name: '', id: -1, people: []});

  // This is the form that we will use to add items to an inventory
  addItemForm: AddItemFormComponent;


  // ActivatedRoute for query params
  // GetInventoryService for mock data
  constructor(private route: ActivatedRoute, private data: InventoryService, private authService: AuthService, private modal: NgbModal) { }

  ngOnInit() {
    // getting the name of the inventory to display
    this.route.paramMap.subscribe(params => {

      this.id = params.get(`id`);
      // fetch all inventories
      this.data.getInventories().subscribe(data => {

        // for every inventory
        for (const inv of data) {
          if (inv.id.toString() === this.id) {
            // found the inventory
            // TODO: else case in case inv not found
            this.thisInv = new Inventory(inv);
            console.log('found this inv');
            console.log(this.thisInv);
            break;
          }
        }
      });
      this.authService.getUser(localStorage.getItem('auth_token')).subscribe(response => {
        this.loggedIn = response.user;
        console.log(this.loggedIn);
      });
    });
  }

  // Opens up the add item form modal
  openAddItemForm(): void {
    const openModal = this.modal.open(AddItemFormComponent, { size: 'lg' });
    console.log(this.thisInv);
    // Passes inventory onto the add item config so they can be added to the correct inv
    openModal.componentInstance.inv = this.thisInv;
  }

  removePerson(): void {
    const openModal = this.modal.open(RemovePersonComponent, { size: 'lg' });
    openModal.componentInstance.inv = this.thisInv;
  }

  openUpdateQuantity(): void {
    const openModal = this.modal.open(UpdatequantityComponent, { size: 'lg' });
    openModal.componentInstance.inv = this.thisInv;
    openModal.result.then((result) => {
      if (result === 'switch') {
        this.openTakeInventory();
      } else {
        this.thisInv = result;
      }
    }).catch((e) => console.log(e));
  }

  openTakeInventory(): void {
    const openModal = this.modal.open(TakeinventoryComponent, {size: 'lg'});
    openModal.componentInstance.inv = this.thisInv;
    openModal.result.then((result) => {
      if (result === 'switch') {
        this.openUpdateQuantity();
      } else {
        this.thisInv = result;
      }
    }).catch((e) => console.log(e));
  }

  // Opens up the add person form modal
  addPerson(): void {
    const openModal = this.modal.open(AddPersonComponent, { size: 'lg' });

    openModal.componentInstance.inv = this.thisInv;
  }
}

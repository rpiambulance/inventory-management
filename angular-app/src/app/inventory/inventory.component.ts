import { Component, OnInit } from '@angular/core';
import { Inventory } from '../inventory';
import { User } from '../user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventoryService } from '../inventory.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RemoveInventoryComponent } from '../remove-inventory/remove-inventory.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  loggedIn: User;
  // the initial store of raw data
  inventoriesJSON: Inventory[];
  // the inventories that loggedIn has access to
  loggedInInventories: Inventory[] = [];
  // Viewed inventories
  viewedInventories: Inventory[] = [];

  constructor(private data: InventoryService, public router: Router, private authServ: AuthService, private modal: NgbModal) {
    // This just prevents some undefined ref errors as things load in
    this.loggedIn = new User('', '', '', '', '');
  }

  ngOnInit() {
    this.authServ.getUser(localStorage.getItem('auth_token')).subscribe((response) => {
      this.loggedIn = response.user;
      // If there is an error it's due to a token issue so we have them login again
      if (!response.success) {
        localStorage.removeItem('auth_token');
        this.router.navigate(['login']);
      }
      // get the inventories from the server
      this.data.getInventories().subscribe((invResponse) => {
        this.inventoriesJSON = invResponse;
        console.log(this.loggedIn);
        for (const inv of this.inventoriesJSON) {
          if (inv.people.includes(this.loggedIn.userName)) {
            this.loggedInInventories.push(inv);
            this.viewedInventories.push(inv);
          }
        }
      });
    });
  }

  newInvButtonClick(): void {
    this.router.navigate(['newInvForm']);
  }

  removeInventory(): void {

    const openModal = this.modal.open(RemoveInventoryComponent, { size: 'lg' });

    openModal.componentInstance.loggedIn = this.loggedInInventories;
  }
  
  onSearch(search_term: string): void{
    this.viewedInventories = [];
    if(search_term == ""){
      for(const inv of this.loggedInInventories){
        this.viewedInventories.push(inv);
      }
    }else{
      for(const inv of this.loggedInInventories){
        // If the inventory contains a substring of the search then display it
        if(inv.name.toLowerCase().includes(search_term.toLowerCase())){
          this.viewedInventories.push(inv);
        }
      }
    }
  }
}

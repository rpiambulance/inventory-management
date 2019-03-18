import { Component, OnInit } from '@angular/core';
import { Inventory } from '../inventory';
import { User } from '../user';
import { InventoryService } from '../inventory.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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

  constructor(private data: InventoryService, public router: Router, private authServ: AuthService) {
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
            console.log(inv);
          }
        }
      });
    });
  }

  newInvButtonClick(): void {
    this.router.navigate(['newInvForm']);
  }
}

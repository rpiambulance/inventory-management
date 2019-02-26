import { Component, OnInit, Input } from '@angular/core';
import { Inventory } from '../inventory';
import { currentUser, MOCK_USERS } from '../mock-data';
import { GetInventoriesService } from '../get-inventories.service';
import { User } from '../user';

@Component({
  selector: 'app-single-inventory',
  templateUrl: './single-inventory.component.html',
  styleUrls: ['./single-inventory.component.css']
})
export class SingleInventoryComponent implements OnInit {

  @Input() user: User;
  constructor() { }

  ngOnInit() {
  }

}

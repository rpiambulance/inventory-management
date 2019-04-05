import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Item } from '../item';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.css']
})
export class BarcodeComponent implements OnInit {

  // The inventory to get
  id: string;
  // Message
  message: string;
  // Success
  barcodeSuccess: boolean = true;
  // The items in that inventory
  items: Item[];
  invName: string;
  constructor(private route: ActivatedRoute, private inventoryService: InventoryService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      console.log(this.id);
      if (this.id == null){
        this.barcodeSuccess = false;
        this.message = "Invalid inventory id";
      }else{
        this.inventoryService.getInventory(this.id).subscribe((inv)=> {
          if(inv.success){
            // If we successfuly find the inventory display it
            inv = inv.inventory;
            this.invName = inv.name;
            this.items = inv.items;
          }else{
            this.message = "Server was unable to process your request, most likely a bad inventory id!";
            this.barcodeSuccess = false;
          }
        });
      }
    });
  }

}

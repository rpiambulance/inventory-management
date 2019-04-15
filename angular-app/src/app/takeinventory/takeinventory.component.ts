import { Component } from '@angular/core';
import { Validators, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Inventory } from '../inventory';
import { InventoryService } from '../inventory.service';
import { Item } from '../item';

@Component({
  selector: 'app-takeinventory',
  templateUrl: './takeinventory.component.html',
  styleUrls: ['./takeinventory.component.css']
})
export class TakeinventoryComponent {
  takeInventoryForm: FormGroup;
  items: FormArray;
  inv: Inventory;
  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private invService: InventoryService) { 
    this.takeInventoryForm = this.fb.group({
      items: this.fb.array([
        this.createItemControl()
      ])
    });
    // Just so this.items isn't null
    this.items = this.takeInventoryForm.get('items') as FormArray;
  }

  createItemControl(): FormGroup {
    return this.fb.group({
      barcode: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  addItem(): void {
    this.items = this.takeInventoryForm.get('items') as FormArray;
    this.items.push(this.createItemControl());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  onEnter(): void{
    this.verifyBarcodes();
    // If it is valid then we can add the next control for another barcode
    if(this.takeInventoryForm.valid){
      this.addItem();
    }
  }

  verifyBarcodes(): void{
    this.items = this.takeInventoryForm.get('items') as FormArray;
    const barcode = this.items.controls;
    const inventoryItems = this.inv.items;
    for(const control of barcode){
      const currentBarcode = control['controls'].barcode;
      let valid = false;
      for(const item of inventoryItems){
        // We verify that everything in the form has a valid barcode that maps to the inventory
        const barcode = item.barcode;
        valid = currentBarcode.value == barcode;
        if (valid) break;
      }
      // Sets the correct error to the barcode whether or not it can find it in the inventory
      if(!valid){
        control['controls'].barcode.setErrors({'invalid': true});
      }else{
        control['controls'].barcode.setErrors(null);
      }
    }
  }

  onSubmit(): void{
    this.verifyBarcodes();
    this.items = this.takeInventoryForm.get('items') as FormArray;
    if(this.takeInventoryForm.valid){
      // We know all the barcodes are valid so we update all the quantities
      for(let control of this.items.controls){
        control = control['controls'];
        for(const item of this.inv.items){
          if(control['barcode'].value == item.barcode){
            item.quantity = control['quantity'].value;
          }
        }
      }
      this.invService.updateInventory(this.inv).subscribe((res) => {
        this.inv = res.inv;
        this.activeModal.close();
      });
    }
  }

}

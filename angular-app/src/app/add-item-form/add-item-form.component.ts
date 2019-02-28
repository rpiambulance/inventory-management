import { Component } from '@angular/core';
import { Validators, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Inventory } from '../inventory';
import { Item } from '../item';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.css']
})
export class AddItemFormComponent {
  addItemForm: FormGroup;
  items: FormArray;
  inv: Inventory;
  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.addItemForm = this.fb.group({
      items: this.fb.array([
        this.createItemControl()
      ])
    });
    // Just so this.items isn't null
    this.items = this.addItemForm.get('items') as FormArray;
  }
  createItemControl(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      barcode: ['', Validators.required]
    });
  }
  // Allows us to keep adding items in one form
  addItem(): void {
    this.items = this.addItemForm.get('items') as FormArray;
    this.items.push(this.createItemControl());
  }

  onSubmit(): void {
    console.log('Submitted');
    const submitItems: Item[] = [];
    // Constructs actual item variables from this
    for (const control of this.items.controls) {
      const vals = control.value;
      submitItems.push(new Item(vals.name, vals.quantity, vals.barcode));
    }
    console.log(submitItems);
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }
}
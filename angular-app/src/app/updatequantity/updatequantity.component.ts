import { Component, OnInit} from '@angular/core';
import { Validators, FormArray, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Inventory } from '../inventory';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-updatequantity',
  templateUrl: './updatequantity.component.html',
  styleUrls: ['./updatequantity.component.css']
})
export class UpdatequantityComponent implements OnInit {
  updateQuantityForm: FormGroup;
  inv: Inventory;
  itemName: string[] = [];
  quantities: FormArray;
  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private invService: InventoryService) {
    this.updateQuantityForm = this.fb.group({
      quantities: this.fb.array([])
    });
    this.quantities = this.updateQuantityForm.get('quantities') as FormArray;
  }

  ngOnInit() {
    this.quantities = this.updateQuantityForm.get('quantities') as FormArray;
    for (const item of this.inv.items) {
      this.itemName.push(item.name);
      this.quantities.push(new FormControl(item.quantity, Validators.required));
    }
  }

  switchMode(): void {
    this.activeModal.close('switch');
  }

  onSubmit(): void {
    this.quantities = this.updateQuantityForm.get('quantities') as FormArray;
    for (let i = 0; i < this.quantities.controls.length; i++) {
      this.inv.items[i].quantity = this.quantities.controls[i].value;
    }
    this.invService.updateInventory(this.inv).subscribe((response) => {
      this.inv = new Inventory(response.inv);
      this.activeModal.close(this.inv);
    });
  }
}

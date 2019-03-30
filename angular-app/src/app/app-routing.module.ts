import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { SingleInventoryComponent } from './single-inventory/single-inventory.component';
import { NewInvFormComponent } from './new-inv-form/new-inv-form.component';
import { AddItemFormComponent } from './add-item-form/add-item-form.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { AddPersonComponent } from './add-person/add-person.component';
import { BarcodeComponent } from './barcode/barcode.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard] },
  { path: 'single-inventory/:id', component: SingleInventoryComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent},
  { path: 'newInvForm', component: NewInvFormComponent, canActivate: [AuthGuard]},
  { path: 'addItemForm', component: AddItemFormComponent, canActivate: [AuthGuard] },
  { path: 'addPerson', component: AddPersonComponent, canActivate: [AuthGuard] },
  { path: 'barcode/:id', component: BarcodeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

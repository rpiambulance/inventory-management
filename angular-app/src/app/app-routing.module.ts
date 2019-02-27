import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { SingleInventoryComponent } from './single-inventory/single-inventory.component';
import { NewInvFormComponent } from './new-inv-form/new-inv-form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'single-inventory/:name', component: SingleInventoryComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'newInvForm', component: NewInvFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

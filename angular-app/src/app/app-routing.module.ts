import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { SingleInventoryComponent } from './single-inventory/single-inventory.component';
import { NewInvFormComponent } from './new-inv-form/new-inv-form.component';
import { AddItemFormComponent } from './add-item-form/add-item-form.component';
import { LandingPageComponent}  from './landing-page/landing-page.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'single-inventory/:name', component: SingleInventoryComponent },
  { path: 'register', component: RegisterComponent},
   { path: 'newInvForm', component: NewInvFormComponent, canActivate: [AuthGuard]},
  { path: 'addItemForm', component: AddItemFormComponent, canActivate: [AuthGuard]},
  { path: 'landing-page',component: LandingPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

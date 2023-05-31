import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCabinetComponent } from "./user-cabinet.component";
import { UserDataComponent } from './user-data/user-data.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';

const routes: Routes = [
  {
    path: '', component: UserCabinetComponent, children: [
      {
        path: 'data', component: UserDataComponent
      },
      {
        path: 'orders', component: UserOrdersComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCabinetRoutingModule { }

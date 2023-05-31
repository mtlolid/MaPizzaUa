import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/modules/shared.module";
import {UserCabinetComponent} from "./user-cabinet.component";
import {UserCabinetRoutingModule} from "./user-cabinet-routing.module";
import { UserDataComponent } from './user-data/user-data.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';

@NgModule({
  declarations: [
    UserCabinetComponent,
    UserDataComponent,
    UserOrdersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserCabinetRoutingModule
  ]
})
export class UserCabinetModule { }

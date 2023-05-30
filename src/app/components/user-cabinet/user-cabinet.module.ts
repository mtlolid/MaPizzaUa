import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/modules/shared.module";
import {UserCabinetComponent} from "./user-cabinet.component";
import {UserCabinetRoutingModule} from "./user-cabinet-routing.module";

@NgModule({
  declarations: [
    UserCabinetComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserCabinetRoutingModule
  ]
})
export class UserCabinetModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DrinksComponent} from "./drinks.component";
import {SharedModule} from "../../../../shared/modules/shared.module";
import { DrinksRoutingModule } from "./drinks-routing.module";



@NgModule({
  declarations: [
    DrinksComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DrinksRoutingModule
  ]
})
export class DrinksModule { }

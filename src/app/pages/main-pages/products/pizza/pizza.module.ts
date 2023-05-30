import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../../../shared/modules/shared.module";
import { PizzaComponent } from "./pizza.component";
import { PizzaRoutingModule } from "./pizza-routing.module";



@NgModule({
  declarations: [
    PizzaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PizzaRoutingModule
  ]
})
export class PizzaModule { }

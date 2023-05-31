import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../../shared/modules/shared.module";
import { DostavkaComponent } from "./dostavka.component";
import { DostavkaRoutingModule } from "./dostavka-routing.module";

@NgModule({
  declarations: [
    DostavkaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DostavkaRoutingModule
  ]
})
export class DostavkaModule { }

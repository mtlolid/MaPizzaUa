import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DessertsComponent } from "./desserts.component";
import { DessertsRoutingModule } from "./desserts-routing.module";
import { SharedModule } from "../../../../shared/modules/shared.module";

@NgModule({
  declarations: [
    DessertsComponent
  ],
  imports: [
    CommonModule,
    DessertsRoutingModule,
    SharedModule
  ]
})
export class DessertsModule { }

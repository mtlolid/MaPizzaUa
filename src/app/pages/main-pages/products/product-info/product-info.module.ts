import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../../../shared/modules/shared.module";
import { ProductInfoComponent } from "./product-info.component";
import { ProductInfoRoutingModule } from "./product-info-routing.module";

@NgModule({
  declarations: [
    ProductInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductInfoRoutingModule
  ]
})
export class ProductInfoModule { }

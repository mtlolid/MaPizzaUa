import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../../../shared/modules/shared.module";
import {SaladsComponent} from "./salads.component";
import {SaladsRoutingModule} from "./salads-routing.module";

@NgModule({
  declarations: [
    SaladsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SaladsRoutingModule
  ]
})
export class SaladsModule { }

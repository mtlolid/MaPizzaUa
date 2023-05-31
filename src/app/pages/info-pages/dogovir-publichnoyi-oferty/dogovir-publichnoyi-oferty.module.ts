import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from "../../../shared/modules/shared.module";
import { DogovirPublichnoyiOfertyComponent } from "./dogovir-publichnoyi-oferty.component";
import { DogovirPublichnoyiOfertyRoutingModule } from "./dogovir-publichnoyi-oferty-routing.module";

@NgModule({
  declarations: [
    DogovirPublichnoyiOfertyComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DogovirPublichnoyiOfertyRoutingModule
  ]
})
export class DogovirPublichnoyiOfertyModule { }

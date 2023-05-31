import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../../shared/modules/shared.module";
import { AboutUsComponent } from "./about-us.component";
import { AboutUsRoutingModule } from "./about-us-routing.module";
import {ActionsModule} from "../actions/actions.module";



@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AboutUsRoutingModule,
    ActionsModule
  ]
})
export class AboutUsModule { }

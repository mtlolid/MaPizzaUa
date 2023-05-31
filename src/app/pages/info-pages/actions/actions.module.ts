import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../../shared/modules/shared.module";
import { ActionsComponent } from "./actions.component";
import { ActionInfoComponent } from "./action-info/action-info.component";
import { ActionsRoutingModule } from "./actions-routing.module";

@NgModule({
  declarations: [
    ActionsComponent,
    ActionInfoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ActionsRoutingModule
  ]
})
export class ActionsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelComponent } from "./admin-panel.component";
import { AdminActionsComponent } from "./admin-actions/admin-actions.component";
import { AdminCategoriesComponent } from "./admin-categories/admin-categories.component";
import { AdminFeedbackComponent } from "./admin-feedback/admin-feedback.component";
import { AdminNewsComponent } from "./admin-news/admin-news.component";
import { AdminProductsComponent } from "./admin-products/admin-products.component";

import { SharedModule } from "../../shared/modules/shared.module";
import {AdminPanelRoutingModule} from "./admin-panel-routing.module";
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';

@NgModule({
  declarations: [
    AdminPanelComponent,
    AdminActionsComponent,
    AdminCategoriesComponent,
    AdminFeedbackComponent,
    AdminNewsComponent,
    AdminProductsComponent,
    AdminOrdersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminPanelRoutingModule
  ]
})
export class AdminPanelModule { }

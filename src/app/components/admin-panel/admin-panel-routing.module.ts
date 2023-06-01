import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPanelComponent } from "./admin-panel.component";
import { AdminActionsComponent } from "./admin-actions/admin-actions.component";
import { AdminCategoriesComponent } from "./admin-categories/admin-categories.component";
import { AdminFeedbackComponent } from "./admin-feedback/admin-feedback.component";
import { AdminNewsComponent } from "./admin-news/admin-news.component";
import { AdminProductsComponent } from "./admin-products/admin-products.component";
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';

const routes: Routes = [
  {
    path: '', component: AdminPanelComponent, children: [
      { path: 'actions', component: AdminActionsComponent },
      { path: 'categories', component: AdminCategoriesComponent },
      { path: 'feedback', component: AdminFeedbackComponent },
      { path: 'news', component: AdminNewsComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: '', pathMatch: 'full', redirectTo: 'actions' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }

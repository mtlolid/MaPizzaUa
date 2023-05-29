import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// ------------ Потім переробити на багатомодульність-------

import { AboutUsComponent } from './pages/info-pages/about-us/about-us.component';
import { ContactsComponent } from './pages/info-pages/contacts/contacts.component';
import { CareerComponent } from './pages/info-pages/career/career.component';
import { NewsComponent } from './pages/info-pages/news/news.component';
import { FaqComponent } from './pages/info-pages/faq/faq.component';
import { DostavkaComponent } from './pages/info-pages/dostavka/dostavka.component';
import { ActionsComponent } from './pages/info-pages/actions/actions.component';
import { PrivacyPolicyComponent } from './pages/info-pages/privacy-policy/privacy-policy.component';
import { DogovirPublichnoyiOfertyComponent } from './pages/info-pages/dogovir-publichnoyi-oferty/dogovir-publichnoyi-oferty.component';

import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminActionsComponent } from './components/admin-panel/admin-actions/admin-actions.component';
import { AdminCategoriesComponent } from './components/admin-panel/admin-categories/admin-categories.component';
import { AdminNewsComponent } from './components/admin-panel/admin-news/admin-news.component';
import { AdminProductsComponent } from './components/admin-panel/admin-products/admin-products.component';
import { AdminFeedbackComponent } from './components/admin-panel/admin-feedback/admin-feedback.component';
import { ActionInfoComponent } from './pages/info-pages/actions/action-info/action-info.component';
import { NewsInfoComponent } from './pages/info-pages/news/news-info/news-info.component';

import { MainComponent } from './pages/main-pages/main/main.component';
import { PizzaComponent } from './pages/main-pages/pizza/pizza.component';
import { SaladsComponent } from './pages/main-pages/salads/salads.component';
import { DessertsComponent } from './pages/main-pages/desserts/desserts.component';
import { DrinksComponent } from './pages/main-pages/drinks/drinks.component';


const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'pizza', component: PizzaComponent },
  { path: 'salads', component: SaladsComponent },
  { path: 'desserts', component: DessertsComponent },
  { path: 'drinks', component: DrinksComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'career', component: CareerComponent },
  { path: 'news', component: NewsComponent },
  { path: 'news/:id', component: NewsInfoComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'dostavka', component: DostavkaComponent },
  { path: 'actions', component: ActionsComponent },
  { path: 'actions/:id', component: ActionInfoComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'dogovir-publichnoyi-oferty', component: DogovirPublichnoyiOfertyComponent },
  {
    path: 'admin', component: AdminPanelComponent, children: [
      { path: 'actions', component: AdminActionsComponent },
      { path: 'categories', component: AdminCategoriesComponent },
      { path: 'feedback', component: AdminFeedbackComponent },
      { path: 'news', component: AdminNewsComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: '', pathMatch: "full", component: AdminProductsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

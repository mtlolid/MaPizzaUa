import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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

import { ActionInfoComponent } from './pages/info-pages/actions/action-info/action-info.component';
import { NewsInfoComponent } from './pages/info-pages/news/news-info/news-info.component';

import { UserCabinetComponent } from './components/user-cabinet/user-cabinet.component';
import { AdminGuard } from './shared/guards/admin/admin.guard';
import { UserGuard } from './shared/guards/user/user.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/main-pages/main/main.module').then(m => m.MainModule)
  },
  {
    path: 'pizza',
    loadChildren: () => import('./pages/main-pages/products/pizza/pizza.module').then(m => m.PizzaModule)
  },
  {
    path: 'salads',
    loadChildren: () => import('./pages/main-pages/products/salads/salads.module').then(m => m.SaladsModule)
  },
  {
    path: 'desserts',
    loadChildren: () => import('./pages/main-pages/products/desserts/desserts.module').then(m => m.DessertsModule)
  },
  {
    path: 'drinks',
    loadChildren: () => import('./pages/main-pages/products/drinks/drinks.module').then(m => m.DrinksModule)
  },
  {
    path: 'product/:category/:id',
    loadChildren: () => import('./pages/main-pages/products/product-info/product-info.module').then(m => m.ProductInfoModule)
  },

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
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./components/admin-panel/admin-panel.module').then(m => m.AdminPanelModule)
  },
  {
    path: 'user-cabinet',
    canActivate: [UserGuard],
    loadChildren: () => import('./components/user-cabinet/user-cabinet.module').then(m => m.UserCabinetModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

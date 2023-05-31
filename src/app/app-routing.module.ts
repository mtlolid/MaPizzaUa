import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AdminGuard } from './shared/guards/admin/admin.guard';
import { UserGuard } from './shared/guards/user/user.guard';
import { FavouriteComponent } from './pages/info-pages/favourite/favourite.component';

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
  {
    path: 'about-us',
    loadChildren: () => import('./pages/info-pages/about-us/about-us.module').then(m => m.AboutUsModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./pages/info-pages/contacts/contacts.module').then(m => m.ContactsModule)
  },
  {
    path: 'career',
    loadChildren: () => import('./pages/info-pages/career/career.module').then(m => m.CareerModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./pages/info-pages/news/news.module').then(m => m.NewsModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./pages/info-pages/faq/faq.module').then(m => m.FaqModule)
  },
  {
    path: 'dostavka',
    loadChildren: () => import('./pages/info-pages/dostavka/dostavka.module').then(m => m.DostavkaModule)
  },
  {
    path: 'actions',
    loadChildren: () => import('./pages/info-pages/actions/actions.module').then(m => m.ActionsModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./pages/info-pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
  },
  {
    path: 'dogovir-publichnoyi-oferty',
    loadChildren: () => import('./pages/info-pages/dogovir-publichnoyi-oferty/dogovir-publichnoyi-oferty.module').then(m => m.DogovirPublichnoyiOfertyModule)
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./components/admin-panel/admin-panel.module').then(m => m.AdminPanelModule)
  },
  {
    path: 'user-cabinet',
    canActivate: [UserGuard],
    loadChildren: () => import('./components/user-cabinet/user-cabinet.module').then(m => m.UserCabinetModule)
  },
  {
    path: 'favourite', component: FavouriteComponent
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

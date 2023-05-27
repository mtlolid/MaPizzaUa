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

const routes: Routes = [
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'career', component: CareerComponent },
  { path: 'news', component: NewsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'dostavka', component: DostavkaComponent },
  { path: 'actions', component: ActionsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'dogovir-publichnoyi-oferty', component: DogovirPublichnoyiOfertyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

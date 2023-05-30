import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutUsComponent } from './pages/info-pages/about-us/about-us.component';
import { ContactsComponent } from './pages/info-pages/contacts/contacts.component';
import { CareerComponent } from './pages/info-pages/career/career.component';
import { NewsComponent } from './pages/info-pages/news/news.component';
import { FaqComponent } from './pages/info-pages/faq/faq.component';
import { DostavkaComponent } from './pages/info-pages/dostavka/dostavka.component';
import { ActionsComponent } from './pages/info-pages/actions/actions.component';
import { VacancyComponent } from './pages/info-pages/vacancy/vacancy.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrivacyPolicyComponent } from './pages/info-pages/privacy-policy/privacy-policy.component';
import { DogovirPublichnoyiOfertyComponent } from './pages/info-pages/dogovir-publichnoyi-oferty/dogovir-publichnoyi-oferty.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';

import { ActionInfoComponent } from './pages/info-pages/actions/action-info/action-info.component';

import { NewsInfoComponent } from './pages/info-pages/news/news-info/news-info.component';

// ---- Потім в шаред модуль
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';

import { ReactiveFormsModule } from '@angular/forms';
import { BasketDialogComponent } from './components/basket-dialog/basket-dialog.component';
import { UserCabinetComponent } from './components/user-cabinet/user-cabinet.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    ContactsComponent,
    CareerComponent,
    NewsComponent,
    FaqComponent,
    DostavkaComponent,
    ActionsComponent,
    VacancyComponent,
    PrivacyPolicyComponent,
    DogovirPublichnoyiOfertyComponent,
    LoginDialogComponent,
    ActionInfoComponent,
    NewsInfoComponent,
    BasketDialogComponent,
    UserCabinetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CdkAccordionModule,
    MatDialogModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    ReactiveFormsModule,
    MatSelectModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

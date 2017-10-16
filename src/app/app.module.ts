import {BrowserModule,} from '@angular/platform-browser';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ClarityModule} from 'clarity-angular';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import {environment} from '../environments/environment';

import {LoginModule} from './login/login.module';
import {AdminModule} from './main/admin.module';
import {AlertService} from './alert.service';

import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ClarityModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LoginModule,
    AdminModule,
    NgxChartsModule
  ],
  providers: [
    AlertService,
    {provide: 'API_URL', useValue: environment.apiUrl},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

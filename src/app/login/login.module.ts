import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ClarityModule} from 'clarity-angular';

import {LoginRoutingModule} from './login-routing.module';
import {HelperModule} from '../helper/helper.module';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterComponent} from './register/register.component';

import {LoginService} from './login.service';
import {UserService} from '../services/user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    HelperModule,
    ClarityModule
  ],
  declarations: [LoginPageComponent, RegisterComponent],
  providers: [LoginService, UserService]
})
export class LoginModule {
}

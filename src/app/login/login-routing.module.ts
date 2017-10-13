import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClarityModule} from 'clarity-angular';
// pages
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterComponent} from './register/register.component'

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ClarityModule
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}

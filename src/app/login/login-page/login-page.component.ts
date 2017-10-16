import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router'

import {LoginService} from '../login.service';
import {AlertService} from '../../alert.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  username: string;
  password: string;
  isLogging = false;

  constructor(private login$: LoginService,
              private alert$: AlertService,
              private router: Router) {
  }

  ngOnInit() {
  }

  enterLogin(event) {
    // enter login
    if (event.keyCode === 13) {
      this.doLogin();
    }
  }

  async doLogin() {
    const user = { username: this.username, password: this.password };
    try {
      this.isLogging = true;
      await this.login$.doLogin(user).subscribe(
        res => {
          this.isLogging = true;
          // redirect to main module
          this.router.navigate(['main']);
        },
        error => {
          this.isLogging = false;
          this.alert$.error(error);
        }
      );
    } catch (error) {
      this.isLogging = false;
      this.alert$.error(error.message);
    }
  }
}

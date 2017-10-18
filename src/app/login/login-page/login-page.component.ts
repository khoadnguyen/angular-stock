import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router'

import {LoginService} from '../login.service';
import {AlertService} from '../../alert.service';
import {UserService} from '../../services/user.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  username: string;
  password: string;
  userData: any;
  isLogging = false;
  subscription: Subscription;

  constructor(private login$: LoginService,
              private alert$: AlertService,
              private user$: UserService,
              private router: Router) {
    // this.subscription = user$.UserAddStream.subscribe(
    //   user => {
    //     this.userData = user['userData'];
    //     console.log(this.userData)
    //   });
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
          // console.log('Response', res.userId)
          sessionStorage.setItem('userid', res.userId);
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

import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Wizard} from 'clarity-angular';

import {LoginService} from '../login.service';
import {AlertService} from '../../alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private user: object = {};
  private isLogging = false;

  constructor(private login$: LoginService,
              private alert$: AlertService,
              private router: Router) { }

  ngOnInit() {
  }

  enterRegister(event) {
    // enter login
    if (event.keyCode === 13) {
      this.doRegister();
    }
  }

  async doRegister() {

    try {
      this.isLogging = true;
      const res: any = await this.login$.doRegister(this.user);
      if (res) {

        // hide spinner
        this.isLogging = true;
        // redirect to main module
        this.router.navigate(['main']);
      } else {
        this.isLogging = false;
        this.alert$.error('Pleas enter valid registration info');
      }
    } catch (error) {
      this.isLogging = false;
      this.alert$.error(error.message);
    }
  }

}

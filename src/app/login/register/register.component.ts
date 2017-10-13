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
  @ViewChild("wizardmd") wizardMedium: Wizard;
  private mdOpen: boolean = true;
  private user: object = {};
  private isLogging = false;

  private signup = {
    firstName: '',
    lastName: '',
    email: '',
    vemail: '',
    username: '',
    password: ''
  };

  constructor(private login$: LoginService,
              private alert$: AlertService,
              private router: Router) { }

  ngOnInit() {
  }

  async doRegister() {
  console.log('Trying to register!');
    try {
      this.isLogging = true;
      const res: any = await this.login$.doRegister(this.user);
      if (res) {
        console.log('Got a response from the login service!')
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

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
  public mdOpen: boolean = true;
  private user: object = {};
  private isLogging = false;
  public vemail: string;

  public signup = {
    firstName: '',
    lastName: '',
    email: '',
    emailVerified: false,
    username: '',
    password: ''
  };

  constructor(private login$: LoginService,
              private alert$: AlertService,
              private router: Router) { }

  ngOnInit() {
  }

  doCancel() {
    this.router.navigate(['login']);
  }

  async doRegister() {
    console.log('Attempting to register')
    if(this.vemail === this.signup.email) {
      this.signup.emailVerified = true;
      console.log(this.signup);
    }
    try {
      this.isLogging = true;
      await this.login$.doRegister(this.signup).subscribe(
        res => {
          this.isLogging = true;
          // redirect to main module
          console.log('Response', res)
          // sessionStorage.setItem('userData', JSON.stringify(res.userData));
          // this.router.navigate(['main']);
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

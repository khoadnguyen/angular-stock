import {Component, OnInit, AfterViewInit } from '@angular/core';
import {Router} from '@angular/router';
import {StockService} from '../../services/stock.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements AfterViewInit {

  public fullname: string;
  public userData: any;
  public loginName: string;
    
  constructor(private router: Router,
              private user$: UserService,
              private stock$: StockService) {}

  logout() {
    sessionStorage.removeItem('userid');
    sessionStorage.clear();
    this.user$.userName = '';
    this.router.navigate(['login']);
  }

  ngAfterViewInit() {
      if(typeof sessionStorage.getItem('userid') == 'string') {
        this.user$.getName().subscribe(
          res => {
            this.fullname = res.firstName + ' ' + res.lastName;
          }
        )
      } else {
          this.fullname = this.user$.userName;
      }
  }

}

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StockService} from '../../services/stock.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public fullname: string;
  public userData: any;

  constructor(private router: Router,
              private user$: UserService,
              private stock$: StockService) {}

  logout() {
    // sessionStorage.removeItem('token');
    // sessionStorage.removeItem('fullname');
    this.router.navigate(['login']);
  }

  ngOnInit() {
    this.user$.getName().subscribe(
      res => {
        this.fullname = res.firstName + ' ' + res.lastName;
      }
    )
  }

}

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StockService} from '../../services/stock.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public fullname: string;
  public dataStockDaily = [];
  private collapsible: boolean = true;
  private collapsed: boolean = true;

  constructor(private router: Router, private stock$: StockService) {
    this.fullname = sessionStorage.getItem('fullname');
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('fullname');
    this.router.navigate(['login']);
  }

  ngOnInit() {
  }

}

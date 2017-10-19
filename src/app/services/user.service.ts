import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  // Observable string sources
  public user;
  public userId;
  public userName;
  public userStocks;
  public newStock: any = {
    'isFave': false
  };
  // private userAdd = new Subject<string>();

  // Observable string streams
  // UserStream = this.user.asObservable();
  // UserAddStream = this.userAdd.asObservable();

  constructor(@Inject('API_URL') private url: string, private http: Http) {
    if(typeof sessionStorage.getItem('userid') == 'string') {
        this.userId = sessionStorage.getItem('userid');
    }
  }

  getName() {
    // console.log('Get Name -');
    return this.http.get(`${this.url}/app-users/` + this.userId )
      .map(res => res.json())
  }

  getStocks() {
    // console.log('Get Stocks -');
    return this.http.get(`${this.url}/app-users/` + this.userId + '/stocks/')
      .map(res => res.json())
  }

  getStockDays(sym, limit){
    // console.log('Get Stocks Days -');
    return this.http.get(`${this.url}/stock-days` + '?filter[where][symbol]=' + sym + '&filter[limit]=' + limit)
    .map(res => res.json())
  }

  addStock(stock){
    // console.log('Add Stocks -');
    return this.http.post(`${this.url}/app-users/` + this.userId + '/stocks', stock)
      .map(res => res.json())
  }

  updateUserStock(stock){
    let newStock = JSON.parse(JSON.stringify(stock));
    delete newStock.id;
    delete newStock.userId;
    return this.http.put(`${this.url}/app-users/` + stock.userId + '/stocks/' + stock.id, newStock)
      .map(res => res.json())
  }

  deleteUserStock(stock) {
    return this.http.delete(`${this.url}/app-users/` + stock.userId + '/stocks/' + stock.id, stock)
      .map(res => res.json())
  }

  addUserData(userData: any) {
    // this.user = userData;
    // this.userName = userData.firstName + ' ' + userData.lastName;
    // this.userStocks = userData.stocks;
    // console.log('User Service:', this.user);
    // console.log(' ', this.userName);
    // console.log(' ', this.userStocks);
  }

}

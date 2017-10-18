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
    this.userId = sessionStorage.getItem('userid');
  }

  getName() {
    return this.http.get(`${this.url}/app-users/` + this.userId )
      .map(res => res.json())
  }

  getStocks() {
    return this.http.get(`${this.url}/app-users/` + this.userId + '/stocks/')
      .map(res => res.json())
  }

  addStock(stock){
    this.newStock.symbol = stock;
    return this.http.post(`${this.url}/app-users/` + this.userId + '/stocks', this.newStock)
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

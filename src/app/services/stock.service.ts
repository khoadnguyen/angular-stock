import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class StockService {
  private apiKey: string = '8R3ATDA4Z6HXHRCC';
  private apiSymbol: string = 'GOOG';
  private apiType: string = 'TIME_SERIES_DAILY';
  private apiLrg: string = 'full';
  private apiSm: string = 'compact';
  private apiInterval: number = 60;
  private apiUrl: string = '//www.alphavantage.co/query?function=';
  private stockApiUrl: string = '';
  public dataStockDaily: any;

  constructor(private http: Http) {
  }

  getData(stocks: any): Observable<any> {
    if (typeof stocks === 'string') {
      console.log("one stock")
      return this.http.get(this.apiUrl + this.apiType + '&symbol=' + stocks + '&outputsize=' + this.apiSm + '&apikey=' + this.apiKey)
        .map(res => res.json());
    } else {
      return Observable.forkJoin(
        stocks.map(
          stock => this.http.get(this.apiUrl + this.apiType + '&symbol=' + stock + '&outputsize=' +
            this.apiSm + '&apikey=' + this.apiKey)
            .map(res => res.json())
        ))
    }
  }

}

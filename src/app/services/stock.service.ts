import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

@Injectable()
export class StockService {
  private apiKey: string = "8R3ATDA4Z6HXHRCC";
  private apiSymbol: string = "GOOG";
  private apiType: string = "TIME_SERIES_DAILY";
  private apiLrg: string = "full";
  private apiSm: string = "compact";
  private apiInterval: number = 60;
  private apiUrl: string = "//www.alphavantage.co/query?function=";
  public dataStockDaily: any;

  constructor(private http: Http) {
  }

  getData() {
    return this.http.get(this.apiUrl + this.apiType + "&symbol=" + this.apiSymbol + "&outputsize=" + this.apiSm + "&apikey=" + this.apiKey)
        .map(res => res.json());
  }

}

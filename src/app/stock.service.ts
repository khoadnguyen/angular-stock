import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

@Injectable()
export class StockService {
  apiKey: string = "";
  url: string = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=MSFT&outputsize=compact&apikey=X7M7H6GIDVV7YRDH";

  constructor(private http: Http) { }

  getData(){
      return this.http.get(this.url)
          .map(res => res.json());
  }

}

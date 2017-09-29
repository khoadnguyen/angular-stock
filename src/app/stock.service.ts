import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

@Injectable()
export class StockService {
	apiKey: string = "8R3ATDA4Z6HXHRCC";
	apiSymbol: string = "GOOGL";
	apiType: string = "TIME_SERIES_DAILY";
	apiLrg: string = "full";
	apiSm: string = "compact";
	apiInterval: number = 60;
	apiUrl: string = "//www.alphavantage.co/query?function=";

	constructor(private http: Http) {
	}

	getData() {
		return this.http.get(this.apiUrl + this.apiType + "&symbol=" + this.apiSymbol + "&outputsize=" + this.apiSm + "&apikey=" + this.apiKey)
			.map(res => res.json());
	}

}

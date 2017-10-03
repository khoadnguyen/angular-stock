import {Component, OnInit } from '@angular/core';
import {StockService} from "../../services/stock.service";
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {single} from './data';

@Component({
	selector: 'app-main-page',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
	public dataStockDaily = [];
	public open: any;

	single: any[];
	multi: any[];

	view: any[] = [700, 400];

	// options
	showXAxis = true;
	showYAxis = true;
	gradient = false;
	showLegend = true;
	showXAxisLabel = true;
	xAxisLabel = 'Country';
	showYAxisLabel = true;
	yAxisLabel = 'Population';

	constructor(private stock$: StockService) {
		this.getData();
		Object.assign(this, {single})
	}

	ngOnInit() {
		this.open = this.dataStockDaily[0];
		//console.log(this.open)
	}

	getData(): void {
		this.stock$.getData().subscribe(res => {
			let currentItem = res['Time Series (Daily)'];
			for(let val in currentItem) {
				if (currentItem.hasOwnProperty(val)) {
					currentItem[val]["6. date"] = val;
					//console.log(currentItem[val]);
					//this.dataStockDaily.push(val);
					this.dataStockDaily.push(currentItem[val]);
				}
			}
			//console.log(this.dataStockDaily);
		});
	}

	colorScheme = {
		domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
	};

	onSelect(event) {
		console.log(event);
	}

}

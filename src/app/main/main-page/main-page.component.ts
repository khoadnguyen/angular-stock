import {Component, OnInit } from '@angular/core';
import {StockService} from "../../services/stock.service";



@Component({
	selector: 'app-main-page',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
	public dataStockDaily = [];
	public open: any;

	constructor(private stock$: StockService) {
		this.getData();
	}

	ngOnInit() {
		this.open = this.dataStockDaily[0];
		console.log(this.open)
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

}

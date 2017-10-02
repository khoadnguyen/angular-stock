import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StockService} from "../../services/stock.service";

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
		//this.getData();
	}

	logout() {
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('fullname');
		this.router.navigate(['login']);
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

	ngOnInit() {
	}

}

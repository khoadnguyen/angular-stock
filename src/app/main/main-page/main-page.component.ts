import {Component, OnInit} from '@angular/core';
import {StockService} from "../../services/stock.service";

@Component({
	selector: 'app-main-page',
	templateUrl: './main-page.component.html',
	styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

	constructor(private stock$: StockService) {
		this.getData();
	}

	ngOnInit() {
	}

	getData(): void {
		this.stock$.getData().subscribe(res => {
			console.log(res);
		});
	}
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from "./stock.service";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'My Stock App';

    constructor(private router: Router, private stock$: StockService) {
        this.getData();
    }

    getData(): void {
        this.stock$.getData().subscribe(res => {
            console.log(res);
        });
    }
}

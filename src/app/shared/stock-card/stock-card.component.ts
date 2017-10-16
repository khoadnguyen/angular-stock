import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CardData} from './stock-card.model';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.css']
})
export class StockCardComponent implements OnInit, OnChanges {

  @Input() symbol: string;
  @Input() stockData: any;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('Changes', changes)
    // console.log(this.stocksObject)
    console.log('This Card Stocks', changes.stockData.currentValue)
  }
  ngOnInit() {
    // console.log(this.stocksObject)
    // console.log('Symbol', this.symbol)
    // console.log('Child Stocks', this.stocksObject)

  }

}

import {Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.css']
})
export class StockCardComponent implements OnInit, OnChanges {

  @Input() symbol: string;
  @Input() stock: any;
  @Input() card: any;
  @Output() elementDeleted: EventEmitter<any> = new EventEmitter();
  public stockData: any;
  public chartData: any;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // .log('Stock Data:', this.stock);
    console.log('Changes:', changes)
    // if (this.stock && this.symbol) {
    //   this.stockData = changes.stock.currentValue;
    //   console.log('This Card Stocks', this.stockData)
    // }

  }
  ngOnInit() {
    // console.log(this.stockObject);
    // console.log('Child Stocks', this.stocksObject)

  }

  deleteElement(element) {
    this.elementDeleted.emit(element);
  }

}

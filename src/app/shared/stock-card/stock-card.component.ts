import {Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter} from '@angular/core';
import {UserService} from '../../services/user.service';

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
  @Output() stockPulled: EventEmitter<any> = new EventEmitter();
  public stockData: any = [];
  public latestData: any;
  public chartData: any = [];
  public newData: any = [];
    
  multi = [
   {
      "name":"Disney",
      "series":[
         {
            "value":98,
            "name":"2017-10-18T00:00:00.000Z"
         },
         {
            "value":98,
            "name":"2017-10-17T00:00:00.000Z"
         },
         {
            "value":98,
            "name":"2017-10-16T00:00:00.000Z"
         },
         {
            "value":97,
            "name":"2017-10-13T00:00:00.000Z"
         },
         {
            "value":96,
            "name":"2017-10-12T00:00:00.000Z"
         },
         {
            "value":98,
            "name":"2017-10-11T00:00:00.000Z"
         },
         {
            "value":99,
            "name":"2017-10-10T00:00:00.000Z"
         },
         {
            "value":99,
            "name":"2017-10-09T00:00:00.000Z"
         },
         {
            "value":100,
            "name":"2017-10-06T00:00:00.000Z"
         },
         {
            "value":100,
            "name":"2017-10-05T00:00:00.000Z"
         },
         {
            "value":100,
            "name":"2017-10-04T00:00:00.000Z"
         },
         {
            "value":100,
            "name":"2017-10-03T00:00:00.000Z"
         },
         {
            "value":99,
            "name":"2017-10-02T00:00:00.000Z"
         },
         {
            "value":98,
            "name":"2017-09-29T00:00:00.000Z"
         },
         {
            "value":98,
            "name":"2017-09-28T00:00:00.000Z"
         },
         {
            "value":99,
            "name":"2017-09-27T00:00:00.000Z"
         },
         {
            "value":98,
            "name":"2017-09-26T00:00:00.000Z"
         },
         {
            "value":99,
            "name":"2017-09-25T00:00:00.000Z"
         },
         {
            "value":98,
            "name":"2017-09-22T00:00:00.000Z"
         },
         {
            "value":98,
            "name":"2017-09-21T00:00:00.000Z"
         },
         {
            "value":99,
            "name":"2017-09-20T00:00:00.000Z"
         },
         {
            "value":98,
            "name":"2017-09-19T00:00:00.000Z"
         },
         {
            "value":98,
            "name":"2017-09-18T00:00:00.000Z"
         },
         {
            "value":98,
            "name":"2017-09-15T00:00:00.000Z"
         },
         {
            "value":97,
            "name":"2017-09-14T00:00:00.000Z"
         },
         {
            "value":98,
            "name":"2017-09-13T00:00:00.000Z"
         },
         {
            "value":97,
            "name":"2017-09-12T00:00:00.000Z"
         },
         {
            "value":97,
            "name":"2017-09-11T00:00:00.000Z"
         },
         {
            "value":97,
            "name":"2017-09-08T00:00:00.000Z"
         },
         {
            "value":97,
            "name":"2017-09-07T00:00:00.000Z"
         }
      ]
   }
];
    
  // NGX Options
  view: any[];
  showXAxis = false;
  showYAxis = true;
  gradient = true;
  timeline = false;
  showLegend = false;
  showXAxisLabel = false;
  showYAxisLabel = false;
  autoScale = true;

  // NGX Color Scheme
  colorScheme = {
    domain: ['#A9CCE3', '#2471A3', '#FFFFFF', '#FFFFFF']
  };
    
  constructor(private user$: UserService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    // .log('Stock Data:', this.stock);
    // console.log('Changes:', changes) 
    // if (this.stock && this.symbol) {
    //   this.stockData = changes.stock.currentValue;
    //   console.log('This Card Stocks', this.stockData)
    // }
    this.newData = this.chartData;
    console.log('chart data:', this.newData)
  }
  ngOnInit() {
    // console.log(this.stockObject);
        this.user$.getStockDays(this.symbol['symbol'], 20)
        .subscribe(
        res => {
            // console.log(res);
            let curItem: any = {}
            curItem.name = this.symbol['name'];
            curItem.series = [];
            
            for(var key in res) {
                // console.log(res[key])
                this.stockData.push(res[key]);
                if(res[key]['date']) {
                       let curValue: any = {}
                       curValue.name = res[key]['date'];
                       curValue.value = res[key]['close'];
                       curItem.series.push(curValue);
                }
            }
            this.chartData.push(curItem);
            this.latestData = res[0];
            this.informParentStock(this.stockData);
        }
    )
    // console.log('Child Stocks:', this.stockData)
    // console.log('Child Chart:', this.chartData)
  }

  informParentStock(stockdata) {
      // console.log('pass to parent:', stockdata)
      this.stockPulled.emit(stockdata)
  }
    
  deleteElement(element) {
    this.elementDeleted.emit(element);
  }

  setFav(fave){
      if(fave.isFave) {
        fave.isFave = false
      } else if (!fave.isFave) {
        fave.isFave = true
      }
      this.user$.updateUserStock(fave).subscribe(
        res => {
            console.log('Changed Fave:', res);
        });
  }
    
  onSelect(event) {
    console.log(event);
  }
    
}

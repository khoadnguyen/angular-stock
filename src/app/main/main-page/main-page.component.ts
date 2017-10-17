import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {StockService} from '../../services/stock.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnChanges {
  multi = [
    {
      'name': 'GOOGL',
      'series': [
        {
          'name': '2010',
          'value': 7300000
        },
        {
          'name': '2011',
          'value': 8940000
        }
      ]
    },
    {
      'name': 'AAPL',
      'series': [
        {
          'name': '2010',
          'value': 7870000
        },
        {
          'name': '2011',
          'value': 8270000
        }
      ]
    },
    {
      'name': 'AMAZ',
      'series': [
        {
          'name': '2010',
          'value': 5000002
        },
        {
          'name': '2011',
          'value': 5800000
        }
      ]
    }
  ];

  stocksObject = {};
  stocksArray = [ 'GOOG', 'AAPL', 'AMZN' ];
  opened: boolean;

  // NGX View
  Lineview: any[];
  Barview: any[];

  // NGX Options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  showYAxisLabel = false;
  oneActive: boolean;
  twoActive: boolean;
  threeActive: boolean;

  colorScheme = {
    domain: ['#A9CCE3', '#2471A3', '#FFFFFF', '#FFFFFF']
  };

  itemMapping: {[k: string]: string} = {'=0': 'No items', '=1': 'One item', 'other': '# items'};

  constructor(private stock$: StockService) {}

  ngOnInit() {
    //this.stock$.getData('GM').subscribe( res => console.log('Single Stock:', res))
    this.stock$.getData(this.stocksArray).subscribe(
      res => {
        for (var i = 0; i < res.length; i++) {
          let currentItem = res[i]['Time Series (Daily)'];
          let currentSymbol = res[i]['Meta Data']['2. Symbol'];
          let currentItemArray = [];
          //console.log('Current Symbol:', currentSymbol)
          //console.log('Response:', res[i]);
          for (let val in currentItem) {
            if (currentItem.hasOwnProperty(val)) {
              currentItem[val]['6. date'] = val;
              currentItemArray.push(currentItem[val]);
            }
          }
          //console.log('Current Array:', currentItemArray);
          (this.stocksObject as any)[currentSymbol] = currentItemArray;
        }
        console.log('Stocks Object: ', this.stocksObject)
      },
      error => console.log('Error:', error)
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Changes', changes)
  }

  addStock(symbol: string): void {
    this.stocksArray.push(symbol);
    this.stock$.getData(symbol).subscribe(
      res => {
      let currentItem = res['Time Series (Daily)'];
      let currentItemArray = [];
      for (let val in currentItem) {
        if (currentItem.hasOwnProperty(val)) {
          currentItem[val]['6. date'] = val;
          currentItemArray.push(currentItem[val]);
        }
      }
      (this.stocksObject as any)[symbol] = currentItemArray;
    },
        error => console.log('Error:', error)
    )
    console.log('Updated Object: ')
  }

  removeStock(symbol: string): void {

  }

  onSelect(event) {
    console.log(event);
  }

}

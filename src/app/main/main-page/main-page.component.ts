import {Component, OnInit} from '@angular/core';
import {StockService} from '../../services/stock.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  single = [
    {
      'name': 'GOOGL',
      'value': 8940000
    },
    {
      'name': 'AAPL',
      'value': 5000000
    },
    {
      'name': 'AMAZ',
      'value': 7200000
    }
  ];
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

  // Stock Graph Data
  googLine = [];

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

  constructor(private stock$: StockService) {

  }

  ngOnInit() {
    for (const stock in this.stocksArray) {
      const value = this.stocksArray[stock];
      this.getData(value);
    }
    console.log('Stock Object:', this.stocksObject);
    console.log('Google Graph Array:', this.googLine);
  }

  getData(symbol: string): void {
    // this.stocksArray.push(symbol);
    this.stock$.getData(symbol).subscribe(res => {
      const currentItem = res['Time Series (Daily)'];
      const currentItemArray = [];
      for (const val in currentItem) {
        if (currentItem.hasOwnProperty(val)) {
          currentItem[val]['6. date'] = Date.parse(val);
          currentItemArray.push(currentItem[val]);
        }
      }
      (this.stocksObject as any)[symbol] = currentItemArray;
    });
  }

  addData(symbol: string): void {
    this.stocksArray.push(symbol);
    this.stock$.getData(symbol).subscribe(res => {
      const currentItem = res['Time Series (Daily)'];
      const currentItemArray = [];
      for (const val in currentItem) {
        if (currentItem.hasOwnProperty(val)) {
          currentItem[val]['6. date'] = val;
          currentItemArray.push(currentItem[val]);
        }
      }
      (this.stocksObject as any)[symbol] = currentItemArray;
    });
  }

  onSelect(event) {
    console.log(event);
  }

}

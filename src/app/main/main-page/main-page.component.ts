import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {StockService} from '../../services/stock.service';
import {UserService} from '../../services/user.service';

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

  stocksObject;
  stocksArray = [];
  opened: boolean;

  // NGX View
  chartData: any[];

  // NGX Options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  showYAxisLabel = false;
  autoScale = true;

  // NGX Color Scheme
  colorScheme = {
    domain: ['#A9CCE3', '#2471A3', '#FFFFFF', '#FFFFFF']
  };

  itemMapping: {[k: string]: string} = {'=0': 'No items', '=1': 'One item', 'other': '# items'};

  constructor(private stock$: StockService, private user$: UserService) {
    this.user$.getStocks().subscribe(
      res => {
        res.forEach( index => this.stocksArray.push(index))
      }
    )
  }

  ngOnInit() {
    //this.stock$.getData('GM').subscribe( res => console.log('Single Stock:', res))
    this.stock$.getData(this.stocksArray).subscribe(
      res => {
        console.log(res)
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
    // console.log('Changes:', changes)
  }

  addStock(symbol: string): void {
    this.stocksArray.push(symbol);

    this.stock$.getData(symbol).subscribe(
      res => {
        const sym = res['Meta Data']['2. Symbol'];
        this.user$.addStock(sym).subscribe( res => console.log(res))
      }
    //   res => {
    //   let currentItem = res['Time Series (Daily)'];
    //   let currentItemArray = [];
    //   for (let val in currentItem) {
    //     if (currentItem.hasOwnProperty(val)) {
    //       currentItem[val]['6. date'] = val;
    //       currentItemArray.push(currentItem[val]);
    //     }
    //   }
    //   (this.stocksObject as any)[symbol] = currentItemArray;
    // },
    //     error => console.log('Error:', error)
    // )
    // console.log('Updated Object: ')
    )}

  onElementDeleted(element) {
    let index = this.stocksArray.indexOf(element);
    this.stocksArray.splice(index, 1);
  }

  onSelect(event) {
    console.log(event);
  }

}

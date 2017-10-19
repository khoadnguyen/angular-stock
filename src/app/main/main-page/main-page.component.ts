import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {StockService} from '../../services/stock.service';
import {UserService} from '../../services/user.service';
import {multiData} from './data';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnChanges {
  stocksObject;
  stocksArray = [];
  opened: boolean;

  // NGX View
  multiData: any[];

  // NGX Options
  showXAxis = false;
  showYAxis = true;
  gradient = true;
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
    Object.assign(this, {multiData})   
  }

  ngOnInit() {
    //this.stock$.getData('GM').subscribe( res => console.log('Single Stock:', res))
  }

  ngOnChanges(changes: SimpleChanges) {
//     console.log('Changes:', changes)
//     this.stock$.getData(this.stocksArray).subscribe(
//       res => {
//         console.log(res)
//         for (var i = 0; i < res.length; i++) {
//           let currentItem = res[i]['Time Series (Daily)'];
//           let currentSymbol = res[i]['Meta Data']['2. Symbol'];
//           let currentItemArray = [];
//           //console.log('Current Symbol:', currentSymbol)
//           //console.log('Response:', res[i]);
//           for (let val in currentItem) {
//             if (currentItem.hasOwnProperty(val)) {
//               currentItem[val]['6. date'] = val;
//               currentItemArray.push(currentItem[val]);
//             }
//           }
//           //console.log('Current Array:', currentItemArray);
//           (this.stocksObject as any)[currentSymbol] = currentItemArray;
//         }
//         console.log('Stocks Object: ', this.stocksObject)
//       },
//       error => console.log('Error:', error)
//     )
  }

  addStock(stockInput: any): void {
    stockInput.isFave = false;
    console.log(stockInput);
    this.user$.addStock(stockInput).subscribe( res => {
        console.log('Added Stock to array:', res);
        this.stocksArray.push(res);
    })
//     this.stock$.getData(stockInput.symbol).subscribe(
//       res => {
//         console.log('Added Stock:', res);
//         const sym = res['Meta Data']['2. Symbol'];
//         // this.user$.addStock(sym).subscribe( res => this.stocksArray.push(res))
//       }
//     //   res => {
//     //   let currentItem = res['Time Series (Daily)'];
//     //   let currentItemArray = [];
//     //   for (let val in currentItem) {
//     //     if (currentItem.hasOwnProperty(val)) {
//     //       currentItem[val]['6. date'] = val;
//     //       currentItemArray.push(currentItem[val]);
//     //     }
//     //   }
//     //   (this.stocksObject as any)[symbol] = currentItemArray;
//     // },
//     //     error => console.log('Error:', error)
//     // )
//     // console.log('Updated Object: ')
//     );
  }

  getChildStocks(stock){
     this.stocksArray.forEach(prop => {
        if(prop.symbol == stock[0].symbol){
            prop.stockData = stock;
        }
     })
     // console.log(stock[0].symbol);
     // console.log(this.stocksArray);
     // console.log(stock);
  }  
    
  onElementDeleted(element) {
    let index = this.stocksArray.indexOf(element);
    this.stocksArray.splice(index, 1);
    this.user$.deleteUserStock(element).subscribe(res => console.log('Deleted Stock'));
  }

  onSelect(event) {
    console.log(event);
  }

}

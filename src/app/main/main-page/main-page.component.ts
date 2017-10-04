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
      "name": "GOOGL",
      "value": 8940000
    },
    {
      "name": "AAPL",
      "value": 5000000
    },
    {
      "name": "AMAZ",
      "value": 7200000
    }
  ];
  multi = [
    {
      "name": "GOOGL",
      "series": [
        {
          "name": "2010",
          "value": 7300000
        },
        {
          "name": "2011",
          "value": 8940000
        }
      ]
    },

    {
      "name": "AAPL",
      "series": [
        {
          "name": "2010",
          "value": 7870000
        },
        {
          "name": "2011",
          "value": 8270000
        }
      ]
    },

    {
      "name": "AMAZ",
      "series": [
        {
          "name": "2010",
          "value": 5000002
        },
        {
          "name": "2011",
          "value": 5800000
        }
      ]
    }
  ];

  public stocksObject = {};
  public stocksArray = [ "GOOG", "AAPL", "AMZN" ];
  public open: any;

  // Stock Data


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

  constructor(private stock$: StockService) {
    console.log(this.stocksArray)
    this.getData("GOOG");
    this.getData("AAPL");
    this.getData("AMAZ");
  }

  ngOnInit() {
    this.stocksArray.forEach(function(x) {
      console.log(x);
    });
  }

  getData(symbol:string): void {
    // this.stocksArray.push(symbol);
    this.stock$.getData(symbol).subscribe(res => {
      let currentItem = res['Time Series (Daily)'];
      let currentItemArray = [];
      for (let val in currentItem) {
        if (currentItem.hasOwnProperty(val)) {
          currentItem[val]["6. date"] = val;
          currentItemArray.push(currentItem[val]);
        }
      }
      (this.stocksObject as any)[symbol] = currentItemArray;

      // console.log('Stock Array:', this.stockArray);
      console.log('Stock Object:', this.stocksObject);
    });
  }

  onSelect(event) {
    console.log(event);
  }

}

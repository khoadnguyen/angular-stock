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

  public dataStockDaily = [];
  public open: any;

  // NGX View
  //view: any[];
  Barview: any[];
  // NGX Options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Stock';
  showYAxisLabel = false;
  yAxisLabel = 'Vol.';

  colorScheme = {
    domain: ['#A9CCE3', '#2471A3', '#FFFFFF', '#FFFFFF']
  };

  constructor(private stock$: StockService) {
    this.getData("GOOG");
  }

  ngOnInit() {
    this.open = this.dataStockDaily[0];
    // console.log(this.open)
  }

  getData(symbol): void {
    this.stock$.getData(symbol).subscribe(res => {
      let currentItem = res['Time Series (Daily)'];
      for (let val in currentItem) {
        if (currentItem.hasOwnProperty(val)) {
          currentItem[val]["6. date"] = val;
          // console.log(currentItem[val]);
          // this.dataStockDaily.push(val);
          this.dataStockDaily.push(currentItem[val]);
        }
      }
      // console.log(this.dataStockDaily);
    });
  }

  onSelect(event) {
    console.log(event);
  }

}

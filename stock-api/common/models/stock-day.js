'use strict';

module.exports = function(Stockday) {

  Stockday.observe('access', function(ctx, next) {
    next()
  })
  Stockday.log = async function(stockTicker, next) {
    const StockService = Stockday.app.dataSources.StockService;
    var results;

    try {
      let stockQuery = await StockService.data(stockTicker);
      var dateData = stockQuery[0];
      var newData = [];
      /*Object.keys(dateData).forEach(function (key, index) {
          var stockDay = {};
          Object.keys(dateData[key]).forEach(function (innerkey, innerindex) {
            if (innerkey === '1. open') {
              stockDay.name = key;
              stockDay.value = parseInt(dateData[key][innerkey]);
              stockDay.symbol = stockTicker;
              //console.log(stockDay);
            }
          });
          newData.push(stockDay)
      });*/

      Object.keys(dateData).forEach(function (key, index) {
        var stockDay = {};
        Object.keys(dateData[key]).forEach(function (innerkey, innerindex) {
          if (innerkey === '1. open') {
            stockDay.symbol = stockTicker;
            stockDay.date = key;
            stockDay.open = parseInt(dateData[key][innerkey]);
          }
          if (innerkey === '2. high') {
            stockDay.high = parseInt(dateData[key][innerkey]);
          }
          if (innerkey === '3. low') {
            stockDay.low = parseInt(dateData[key][innerkey]);
          }
          if (innerkey === '4. close') {
            stockDay.close = parseInt(dateData[key][innerkey]);
          }
          if (innerkey === '5. volume') {
            stockDay.volume = parseInt(dateData[key][innerkey]);
          }
        });
        newData.push(stockDay)
      });


      results = newData;
    }
    catch(error){
      return Promise.reject(error)
    }
    return Promise.resolve(results)
  }

  Stockday.remoteMethod(
    'log', {
      http: {
        path: '/log',
        verb: 'get'
      },
      accepts: {arg: 'stockTicker', type: 'string', http: { source: 'query' } },
      returns: {
        arg: 'dates',
        type: 'array'
      }
    });

};

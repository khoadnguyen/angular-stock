'use strict';

module.exports = function(Stockday) {


  Stockday.observe('access', function(ctx, next) {
    next()
  })
  Stockday.log = async function(stockTicker, next) {
    const StockService = Stockday.app.dataSources.StockService;
    var results;

    try {
      let stockQuery = await StockService.data(stockTicker)
      var dateData = stockQuery[0]['Time Series (Daily)'];
      var newData;
      Object.keys(dateData).forEach(function(key,index) {
        Object.keys(dateData[key]).forEach(function(innerkey, innerindex) {
          if(innerkey === '1. open'){
            newData[key].open =
          }

        });

      });

      results = dateData;
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
        arg: 'dates'
      }
    });

};

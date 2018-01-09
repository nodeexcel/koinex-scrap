var _ = require('lodash');

module.exports = {
    getCandles: function(data, totime, fromTime, interval, currency, callback) {
        var result = []
        //using loop till we filter all the arrray chunks
        do {
            // getting array chunks for every time interval
            var arrayChunks = _.filter(data, function(result) {
                return ((new Date(totime) >= new Date(result.date)) && (new Date(fromTime) <= new Date(result.date)));
            })
            //if filter result is not empty
            if (arrayChunks.length > 0) {
                //storing the prices of first minute of a time interval, to use for further calculations
                var prices = arrayChunks[0].price
                //calculating volume by getting difference between last iteration volume and current iteration volume
                //and storing the high,low and volume of last data in array
                for (var a in prices) {

                    if (result.length != 0) {
                        result[result.length - 1].volume = prices[a].volume - volume;
                        result[result.length - 1].high = high;
                        result[result.length - 1].low = low;
                    }
                    if (prices[a][currency]) {
                        //initially storing open and date value of currencies
                        var currency_data = {
                            "open": prices[a][currency],
                            "date": arrayChunks[0].date
                        }
                        var price_minutes = []
                        //getting all currency prices in array to find high and low
                        for (var k in arrayChunks) {
                            price_minutes.push(arrayChunks[k].price[a][currency])

                        }
                        //calculating values of max and min values for getting high and low.
                        var high = _.max(price_minutes);
                        var low = _.min(price_minutes);
                        var volume = prices[a].volume;
                        //if result array is not empty, then it will store the current price of currency as the closing price of last time interval
                        if (result.length != 0) {
                            result[result.length - 1].close = prices[a][currency];
                        }
                        result.push(currency_data)
                    }
                }
            }

            //calculating start time and end time for fetching data in next iteration
            fromTime = new Date(totime.getTime() + 1000 * 60 * 1);
            totime = new Date(totime.getTime() + 1000 * 60 * interval);
        } while (fromTime <= data[data.length - 1].date) //will stop the loop when start time of the interval wii be more then the time of last data
        //will return the callback if all data is calculated
        if (!fromTime <= data[data.length - 1].date) {
            callback(result)
        }
    }
}
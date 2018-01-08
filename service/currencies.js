var _ = require('lodash');

module.exports = {
    getCandles: function(data, totime, fromTime, interval, currency, callback) {
        var result = []
        var i = 0
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
                //for calculating only desired currency
                if (currency == 'BTC') {
                    //calculating volume by getting difference between last iteration volume and current iteration volume
                    //and storing the high,low and volume of last data in array
                    if (result.length != 0) {
                        result[result.length - 1].volume = prices[0].volume - volume;
                        result[result.length - 1].high = high;
                        result[result.length - 1].low = low;
                    }

                    for (var a in prices) {
                        if (prices[a].BTC) {
                            //initially storing open and date value of currencies
                            var BTC = {
                                "BTC_open": prices[a].BTC,
                                "date": arrayChunks[0].date
                            }
                            var price_minutes = []
                            //getting all currency prices in array to find high and low
                            for (var k in arrayChunks) {
                                price_minutes.push(arrayChunks[k].price[a].BTC)

                            }
                            //calculating values of max and min values for getting high and low.
                            var high = _.max(price_minutes);
                            var low = _.min(price_minutes);
                            var volume = prices[a].volume;
                            //if result array is not empty, then it will store the current price of currency as the closing price of last time interval
                            if (result.length != 0) {
                                result[result.length - 1].close = prices[a].BTC;
                            }
                            result.push(BTC)
                        }
                    }
                }

                if (currency == 'ETH') {
                    if (result.length != 0) {
                        result[result.length - 1].high = high;
                        result[result.length - 1].low = low;
                        result[result.length - 1].volume = prices[1].volume - volume;
                    }
                    for (var a in prices) {
                        if (prices[a].ETH) {
                            var ETH = {
                                "ETH_open": prices[a].ETH,
                                "date": arrayChunks[0].date
                            }
                            var price_minutes = []
                            for (var k in arrayChunks) {
                                price_minutes.push(arrayChunks[k].price[1].ETH)

                            }
                            var high = _.max(price_minutes);
                            var low = _.min(price_minutes);
                            var volume = prices[a].volume;
                            if (result.length != 0) {
                                result[result.length - 1].close = prices[a].ETH
                            }
                            result.push(ETH)
                        }
                    }
                }

                if (currency == 'XRP') {
                    if (result.length != 0) {
                        result[result.length - 1].high = high;
                        result[result.length - 1].low = low;
                        result[result.length - 1].volume = prices[2].volume - volume;
                    }
                    for (var a in prices) {
                        if (prices[a].XRP) {
                            var XRP = {
                                "XRP_open": prices[a].XRP,
                                "date": arrayChunks[0].date
                            }
                            var price_minutes = []
                            for (var k in arrayChunks) {
                                price_minutes.push(arrayChunks[k].price[a].XRP)
                            }
                            var high = _.max(price_minutes);
                            var low = _.min(price_minutes);
                            var volume = prices[a].volume;
                            if (result.length != 0) {
                                result[result.length - 1].close = prices[a].XRP
                            }
                            result.push(XRP)
                        }
                    }
                }

                if (currency == 'LTC') {
                    if (result.length != 0) {
                        result[result.length - 1].high = high;
                        result[result.length - 1].low = low;
                        result[result.length - 1].volume = prices[3].volume - volume;
                    }
                    for (var a in prices) {
                        if (prices[a].LTC) {
                            var LTC = {
                                "LTC_open": prices[a].LTC,
                                "date": arrayChunks[0].date
                            }
                            var price_minutes = []
                            for (var k in arrayChunks) {
                                price_minutes.push(arrayChunks[k].price[a].LTC)
                            }
                            var high = _.max(price_minutes);
                            var low = _.min(price_minutes);
                            var volume = prices[a].volume;
                            if (result.length != 0) {
                                result[result.length - 1].close = prices[a].LTC
                            }
                            result.push(LTC)
                        }
                    }
                }

                if (currency == 'BCH') {
                    if (result.length != 0) {
                        result[result.length - 1].high = high;
                        result[result.length - 1].low = low;
                        result[result.length - 1].volume = prices[4].volume - volume;
                    }
                    for (var a in prices) {
                        if (prices[a].BCH) {
                            var BCH = {
                                "LTC_open": prices[a].BCH,
                                "date": arrayChunks[0].date
                            }
                            var price_minutes = []
                            for (var k in arrayChunks) {
                                price_minutes.push(arrayChunks[k].price[a].BCH)
                            }
                            var high = _.max(price_minutes);
                            var low = _.min(price_minutes);
                            var volume = prices[a].volume;
                            if (result.length != 0) {
                                result[result.length - 1].close = prices[a].BCH
                            }
                            result.push(BCH)
                        }
                    }
                }
            }

            //calculating start time and end time for fetching data in next iteration
            fromTime = new Date(totime.getTime() + 1000 * 60 * 1);
            totime.setMinutes(fromTime.getMinutes() + interval - 1);
            i++;
        } while (fromTime <= data[data.length - 1].date) //will stop the loop when start time of the interval wii be more then the time of last data
        //will return the callback if all data is calculated
        if (!fromTime <= data[data.length - 1].date) {
            callback(result)
        }
    }
}
/* Process the data to get the prices for the day (closest to 00:00 UTC time). Return them as object with following keys
    This works with different data granularity's that the API is using. So we can always pass the data here to get prices closest to 00:00 UTC time.
    "date": full date string format
    "price": price closest to 00:00 UTC
*/
function getDailyPrices(data) {
    const pricesArray = [];
    const len = data.prices.length;
    let currentDay, previousDay, currentPrice, previousPrice

    for (let i = 1; i < len; i++) {
        currentDay = new Date(data.prices[i][0]).getUTCDay();
        currentPrice = data.prices[i][1];
        previousDay = new Date(data.prices[i - 1][0]).getUTCDay();
        previousPrice = data.prices[i - 1][1];

        // Get the last element of day
        if (currentDay !== previousDay) {
            const dataObject = {
                "date": new Date(data.prices[i - 1][0]).toUTCString(),
                "price": previousPrice, 
            }
            pricesArray.push(dataObject)
        }

        // Get the last element of the array
        if (i === len - 1) {
            const dataObject = {
                "date": new Date(data.prices[i][0]).toUTCString(),
                "price": currentPrice, 
            }
            pricesArray.push(dataObject)
        }
    }
    return pricesArray;
}

/* A. How many days is the longest bearish (downward) trend within given data range
 1. Parse data to daily format
 2. Loop through and keep track if prices are dropping or rising. 
 3. Return longest trending trend
*/
function downwardTrend(data) {
    const prices = getDailyPrices(data); // Parse data to daily format
    let downwardTrend = 0;
    let maxDownward = 0;
    for (let i = 1; i < prices.length; i++) {
        let currentPrice = prices[i].price;
        let previousPrice = prices[i - 1].price;

        if (currentPrice < previousPrice) {
            downwardTrend++;
        } else {
            downwardTrend = 0;
        }

        if (downwardTrend > maxDownward) {
            maxDownward = downwardTrend;
        }
    }
    return maxDownward;
}

/* B. Which date within a given date range had the highest trading volume
 1. Loop through and find highest value in the array. Store index of that element
 2. Return that element
*/
function highestTradingVolume(data) {
    let indexHighestVolume = 0;
    let maxTotalVolume = 0;
    let totalVolume;
    let len = data.total_volumes.length;

    for (let i = 0; i < len; i++) {
        totalVolume = data.total_volumes[i][1];
        if (totalVolume > maxTotalVolume) {
            maxTotalVolume = totalVolume;
            indexHighestVolume = i;
        } 
    }

    const dataObject = {
        "date": new Date(data.total_volumes[indexHighestVolume][0]).toUTCString(),
        "total_volume": data.total_volumes[indexHighestVolume][1], 
    }
    return dataObject;
}

/* C. Time machine Best time to but and sell withing given date range
 1. Parse data to daily format
 2. Brute Force to find best dates.
*/
function bestTimeToBuyAndSell(data) {
    const prices = getDailyPrices(data); // Parse data to daily format
    let bestProfit = 0;
    let profit = 0;
    let profitData = {
        "canYouProfit": false
    };

    // Loop from beginning to second to last element
    for (let i = 0; i < prices.length - 1; i++) {
        // Run nested loop so that we get every element after outer loops index
        for( let j = i + 1; j < prices.length; j++) {
            // Check price difference and check if it's bigger than previous best profit.
            profit = prices[j].price - prices[i].price;
            if (profit > bestProfit) {
                bestProfit = profit;
                profitData = {
                    "canYouProfit": true,
                    "profit": new Intl.NumberFormat('fi-FI', {style: 'currency', currency: 'EUR', maximumFractionDigits: 0}).format(bestProfit),
                    "dateToBuy": prices[i].date.slice(0,16),
                    "priceToBuy": new Intl.NumberFormat('fi-FI', {style: 'currency', currency: 'EUR', maximumFractionDigits: 0}).format(prices[i].price),
                    "dateToSell": prices[j].date.slice(0,16),
                    "priceToSell": new Intl.NumberFormat('fi-FI', {style: 'currency', currency: 'EUR', maximumFractionDigits: 0}).format(prices[j].price),
                }
            }
        }
    }

    return profitData;
}

/* Functions to get data range in days */
function daysBetweenTwoDates(dateStart, dateEnd) {
    const timeDifference = new Date(dateEnd).getTime() - new Date(dateStart).getTime();
    const dayDifference = timeDifference / (1000 * 60 * 60 * 24);  
    return Math.round(dayDifference);
}

function getDataLength(data) {
    let len = data.prices.length;
    let dateStart = data.prices[0][0];
    let dateEnd = data.prices[len - 1][0];
    return daysBetweenTwoDates(dateStart, dateEnd);
}


const utils = {
    downwardTrend,
    highestTradingVolume,
    getDailyPrices,
    bestTimeToBuyAndSell,
    getDataLength
}

export default utils

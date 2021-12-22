/*
UI Element to show should you buy and sell between data range 

profitData = {
    "canYouProfit": boolean
    "profit": number,
    "dateToBuy": date string
    "priceToBuy": number
    "dateToSell": date string
    "priceToSell": number

*/

const TimeMachine = ( {profitData} ) => {
    return (
        <div className="info-card"> 
            <p className="info-header">Best time to buy and sell Bitcoin</p>
            {profitData.canYouProfit ? 
                <p className="info-text">
                    {profitData.dateToBuy} buy with {profitData.priceToBuy}<br></br>
                    {profitData.dateToSell} sell with {profitData.priceToSell}<br></br>
                    Profit for one Bitcoin {profitData.profit}
                </p>
                :
                <p>You cannot profit</p>
            }
        </div>
    )
}

export default TimeMachine

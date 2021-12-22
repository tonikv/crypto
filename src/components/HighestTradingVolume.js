// UI Element to show highest trading volume date trend 

const HighestTradingVolume = ( {highestTradingVolume} ) => {
    const volumeInEuros = new Intl.NumberFormat('fi-FI', 
        {style: 'currency', currency: 'EUR', maximumFractionDigits: 0}).format(highestTradingVolume.total_volume);
    return (
        <div className="info-card">
            <p className="info-header">Highest Trading Volume 24h</p>
            <p className="info-text">{highestTradingVolume.date.slice(0,16)} <br></br> {volumeInEuros} </p>
        </div>
    )
}

export default HighestTradingVolume

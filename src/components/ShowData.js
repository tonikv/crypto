/*
    Component to pass the data in to and render it 
    First check that is data available. After that we process data to answer requested properties of Bitcoin

 */


import DownwardTrend from './DownwardTrend';
import utils from '../utils';
import HighestTradingVolume from './HighestTradingVolume';
import TimeMachine from './TimeMachine';
import DaysOfData from './DaysOfData';

const ShowData = ( {cryptoData} ) => {
    if (!cryptoData) {
        return (
            <div className="info-card">
                <p className="info-header"> Enter dates to get information from coinGecko API conserning Bitcoin </p>
            </div>)
    }

    const daysBetween = utils.getDataLength(cryptoData);
    const maxDownward = utils.downwardTrend(cryptoData);
    const highestTradingVolume = utils.highestTradingVolume(cryptoData);
    const profitData = utils.bestTimeToBuyAndSell(cryptoData);

    return (
        <>
            <DaysOfData
                days={daysBetween}
            ></DaysOfData>
            <DownwardTrend
                downwardTrend={maxDownward}
            ></DownwardTrend>
            <HighestTradingVolume
                highestTradingVolume={highestTradingVolume}
            ></HighestTradingVolume>
            <TimeMachine
                profitData={profitData}
            ></TimeMachine>
        </>
    )
}

export default ShowData;
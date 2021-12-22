import './App.css';
import { useState } from 'react'
import ShowData from './components/ShowData';
import DatePicker from './components/DatePicker';
import Footer from './components/Footer';

function App() {
  const [cryptoData, setCryptoData] = useState(undefined);

  async function getData(dates) {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${dates.from}&to=${dates.to}`);

    const data = await response.json()
    if (data.prices.length > 0) {
      setCryptoData(data);
    } else {
      console.log("ERROR: No data in that data range")
    }
}

  return (
    <div className="App">
      <header className="App-header">
        CRYPTO ANALYZER
      </header>
        <DatePicker
          getData={getData}
        />
        <ShowData
          cryptoData={cryptoData}
        />
      <Footer></Footer>
    </div>
  );
}

export default App;

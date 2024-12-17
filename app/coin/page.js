"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import CoinDropdown from "./dropdown";

function page() {
    const[veri,setveri]=useState([])
    const [search,setsearch] = useState('')
    const [amount,setamount] = useState(1);
    const [fromCoin,setFromCoin] = useState("bitcoin")
    const [toCoin,setToCoin] = useState("Ether")
    const [convertedValue, setConvertedValue] = useState(0);

    useEffect(() => {
        axios.get('https://api.coinlore.net/api/tickers/')
          .then((response) => setveri(response.data.data))
          .catch((error) => console.error('API error:', error));
      }, []); 
      
    const cryptoConvert = () => {
        const fromRate = veri.find((coin) => coin.name.toLowerCase() === fromCoin.toLowerCase())?.price_usd || 0;
        const toRate = veri.find((coin) => coin.name.toLowerCase() === toCoin.toLowerCase())?.price_usd || 0;
        if (fromRate > 0 && toRate > 0) {
            const result = (amount * fromRate) / toRate;
            setConvertedValue(result.toFixed(6)); // Round to 6 decimal places
          } else {
            setConvertedValue("Conversion Error"); // Handle missing data
          }
    };

  return (
    <div>

        <div className='ConverterBox'>
            <h2 className='convertText'>
                Crypto Converter
            </h2>
            <div>
                <CoinDropdown 
                coins={veri}
                selectedCoin={fromCoin}
                setSelectedCoin={setFromCoin}/>

                <CoinDropdown 
                coins={veri}
                selectedCoin={toCoin}
                setSelectedCoin={setToCoin}/>
            </div>
            <div className='inputField'>
                <label htmlFor='amount' className='labelAmount'>AMOUNT:</label>
                <input className='inputAmount' type='number' value={amount} onChange={(e)=>setamount(Number(e.target.value))}/>
            </div>
            <div style={{display:'flex',justifyContent:'end'}}>
                <button onClick={cryptoConvert} className='convertBtn'>Convert</button>
            </div>
            <div className='AnswerBox'>
            <h3>
            {amount} {fromCoin} = {convertedValue} {toCoin}
            </h3>
            </div>
        </div>

        <div id="filter">
            <input placeholder='Coin ismi veya sembolu' onChange={(e) => setsearch(e.target.value)}/>
        </div>
        <table border="1" id='tablo'>
            <tr>
                <th>Isim</th>
                <th>24 saat</th>
                <th>Fiyat</th>
            </tr>
            {veri
            .filter((coin) => {
                return search.toLowerCase() === '' ? coin : coin.name.toLowerCase().includes(search)
            })
            .map((coin)=>(
                <tr key={coin.id}>
                    <td>{coin.name}</td>
                    <td style={{color:coin.percent_change_24h>0?'green':'red'}}>
                        {coin.percent_change_24h}% 
                        {coin.percent_change_24h > 0 ? (
                            <i className="fa-solid fa-arrow-trend-up"></i>
                             ) : (<i className="fa-solid fa-arrow-trend-down"></i>
                                
                             )}
                    </td>
                    <td>{coin.price_usd} $</td>
                </tr>
            ))}
        </table>
    </div>
  )
}

export default page
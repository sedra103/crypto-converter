import React from "react";

const CoinDropdown = ({ coins, selectedCoin, setSelectedCoin }) => {
  return (
    <select
      value={selectedCoin}
      onChange={(e) => setSelectedCoin(e.target.value)}
      style={{ padding: "5px", margin: "10px" }}
    >
      {coins.map((coin) => (
        <option key={coin.id} value={coin.name}>
          {coin.name}
        </option>
      ))}
    </select>
  );
};

export default CoinDropdown;


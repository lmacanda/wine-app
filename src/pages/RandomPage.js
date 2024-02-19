// pages/random.js
import React, { useState } from "react";
import { useWineContext } from "../context/WineContext";

function RandomPage() {
  const { wineData } = useWineContext();
  const [randomWine, setRandomWine] = useState(null);

  const handleRandomWine = () => {
    const randomIndex = Math.floor(Math.random() * wineData.length);
    setRandomWine(wineData[randomIndex]);
  };

  return (
    <div>
      <h2>Random Wine</h2>
      <button onClick={handleRandomWine}>Get a Random Wine</button>
      {randomWine && <div>{randomWine.name}</div>}
    </div>
  );
}

export default RandomPage;

import React, { useState, useEffect } from "react";
import { useWineContext } from "../../context/WineContext";
import "./WineList.css";

function WineList() {
  const { filteredWineData } = useWineContext();
  const [displayedData, setDisplayedData] = useState([]);

  useEffect(() => {
    // If there are filters, use filteredWineData; otherwise, use an empty array
    setDisplayedData(filteredWineData.length > 0 ? filteredWineData : []);
  }, [filteredWineData]);

  return (
    <div className="WineList_container">
      {displayedData.length === 0 ? (
        <h1>No wines found</h1>
      ) : (
        displayedData.map(
          ({ id, name, year, makers, region, grapes, image, color, notes }) => (
            <div className="product-card-content" key={id}>
              <div className="product-card-left">
                <h1 className="product-card-name">{name}</h1>
                <div className="color-squares">
                  {color === "rosé" && <div className="square rose"></div>}
                  {color === "Branco" && <div className="square white"></div>}
                  {color === "Tinto" && <div className="square red"></div>}
                </div>
                <h2>{makers}</h2>
                <h3>{year}</h3>

                <h2>{region}</h2>
                <h3>🍇{grapes}</h3>
                {notes && <h4>{notes}</h4>}
              </div>

              <div className="product-card-right">
                {image && <img src={image} alt={name} />}
              </div>
            </div>
          )
        )
      )}
    </div>
  );
}

export default WineList;

import React from "react";
import "./WineList.css";

const WineList = ({ wines }) => {
  return (
    <div className="WineList_container">
      {wines.length === 0 ? (
        <h1>No wines found</h1>
      ) : (
        wines.map(
          ({ id, name, year, makers, region, grapes, image, color, notes }) => (
            <div className="product-card-content" key={id}>
              <div className="product-card">
                <article>
                  <h1 className="product-card-name">{name}</h1>
                  <p>{color}</p>
                  <h2>{makers}</h2>
                  <h3>{year}</h3>
                  {image && <img src={image} alt={name} />}
                  <h2>{region}</h2>
                  <h3>🍇{grapes}</h3>
                  {notes && <h4>{notes}</h4>}
                </article>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
};

export default WineList;

import React, { useState, useEffect, useCallback } from "react";
import { useWineContext } from "../../context/WineContext";
import "./filter.css";

const Filter = () => {
  const { wineData, setFilteredWineData } = useWineContext();
  const [regionFilter, setRegionFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [grapesFilter, setGrapesFilter] = useState("");
  const [uniqueRegions, setUniqueRegions] = useState([]);
  const [uniqueGrapes, setUniqueGrapes] = useState([]);

  const filterWineData = useCallback(() => {
    const filters = {
      region: regionFilter,
      color: colorFilter,
      grapes: grapesFilter,
    };

    const filteredData = wineData.filter((wine) => {
      const isColorMatch =
        !filters.color ||
        wine.color.toLowerCase() === filters.color.toLowerCase();
      const isRegionMatch =
        !filters.region ||
        wine.region.toLowerCase() === filters.region.toLowerCase();
      const isGrapesMatch =
        !filters.grapes ||
        wine.grapes.toLowerCase() === filters.grapes.toLowerCase();

      return isColorMatch && isGrapesMatch && isRegionMatch;
    });

    setFilteredWineData(filteredData);
  }, [regionFilter, colorFilter, grapesFilter, wineData, setFilteredWineData]);

  const updateUniqueGrapesAndRegions = useCallback(() => {
    const allGrapes = wineData.map((wine) => wine.grapes);
    const allRegions = wineData.map((wine) => wine.region);

    const uniqueGrapesOptions = Array.from(new Set(allGrapes.flat()));
    const uniqueRegionsOptions = Array.from(new Set(allRegions.flat()));

    setUniqueGrapes(uniqueGrapesOptions);
    setUniqueRegions(uniqueRegionsOptions);
  }, [wineData]);

  useEffect(() => {
    filterWineData();
  }, [filterWineData]);

  useEffect(() => {
    updateUniqueGrapesAndRegions();
  }, [updateUniqueGrapesAndRegions]);

  const handleColorChange = (e) => {
    const selectedColor = e.target.value;

    setColorFilter(selectedColor);
    setGrapesFilter(""); // Reset grape filter when color changes
    setRegionFilter(""); // Reset region filter when color changes
  };

  return (
    <div>
      <div className="filter-container">
        <div>
          <label>Color: </label>
          <select value={colorFilter} onChange={handleColorChange}>
            <option value="">All</option>
            <option value="rosé">Rosé</option>
            <option value="Branco">White</option>
            <option value="Tinto">Red</option>
          </select>
        </div>
        <div>
          <label>Region: </label>
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
          >
            <option value="">All</option>
            {uniqueRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Grapes: </label>
          <select
            value={grapesFilter}
            onChange={(e) => setGrapesFilter(e.target.value)}
          >
            <option value="">All</option>
            {uniqueGrapes.map((grapes) => (
              <option key={grapes} value={grapes}>
                {grapes}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;

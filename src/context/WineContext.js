// contexts/WineContext.js
import { createContext, useContext, useState } from "react";

const WineContext = createContext();

export function WineProvider({ children }) {
  const [wineData, setWineData] = useState([
    {
      id: 1,
      name: "Les Copines",
      year: "2020",
      makers: "J.L Tribouley-Roussillon",
      region: "França Languedoc-Roussillon",
      grapes: "Syraz Carignan",
      price: "28€",
      color: "Tinto",
      notes: "",
    },
    {
      id: 2,
      name: "Tentenublo",
      year: "2016",
      makers: "Tentenublo",
      region: "Rioja",
      grapes: "Pinos Gris",
      image:
        "https://www.wine-searcher.com/images/labels/15/44/11221544.jpg?width=260&height=260&fit=bounds&canvas=260,260",
      color: "Tinto",
      price: "25€",
      notes: "",
    },
    {
      id: 3,
      name: "Achada",
      year: "2016",
      makers: "Qta.da Pellada & Os Goliardos",
      region: "Dão",
      color: "Tinto",
      grapes: "Alfrochero",
      notes: "",
    },
    {
      id: 4,
      name: "Humus Deriva",
      year: "2014",
      makers: "Encosta da Quinta",
      region: "Lisboa",
      color: "Tinto",
      grapes: "Touriga Nacional",
      notes: "7 days maceration, 12 months aging in used barrel",
    },
    {
      id: 5,
      name: "Merenxiao",
      year: "2020",
      makers: "Pablo Soldavini",
      region: "Ribeira Sacra(Galiza)",
      color: "Tinto",
      grapes: "Grenache Carignan",
      notes: "",
    },
    {
      id: 6,
      name: "Alba",
      year: "2019",
      makers: "J.L.Tribouley",
      region: "Roussilon",
      color: "Tinto",
      grapes: "Syrah Grenache Carignan",
      notes: "",
      image:
        "https://www.wine-searcher.com/images/labels/07/29/10480729.jpg?width=260&height=260&fit=bounds&canvas=260,260",
    },
    {
      id: 7,
      name: "Col de Segas",
      year: "2016",
      makers: "Domain de Majas",
      region: "Roussillon",
      color: "Tinto",
      grapes: "Grenache Carignan",
      notes: "",
    },
    {
      id: 8,
      name: "Gaia",
      year: "2021",
      makers: "Cantina Giardino",
      region: "Campania",
      color: "Branco",
      grapes: "Fiano",
      notes: "",
    },
    // Add more wine items as needed
  ]);
  const [filteredWineData, setFilteredWineData] = useState([]);

  const addWine = (wine) => {
    setWineData([...wineData, wine]);
  };

  const contextValue = {
    wineData,
    addWine,
    setWineData,
    filteredWineData,
    setFilteredWineData,
  };

  return (
    <WineContext.Provider value={contextValue}>{children}</WineContext.Provider>
  );
}

export function useWineContext() {
  return useContext(WineContext);
}

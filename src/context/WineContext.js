import { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://gvxdtrkxrhvteiyeveyu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2eGR0cmt4cmh2dGVpeWV2ZXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcwODkwOTcsImV4cCI6MjAyMjY2NTA5N30.KnZpaGKuXgzwqvhH6nfnVFK-DdFCOog_2dSX3KjOznQ"
);

const WineContext = createContext();

export function WineProvider({ children }) {
  const [wineData, setWineData] = useState([]);

  useEffect(() => {
    getWines();
  }, []);

  async function getWines() {
    const { data, error } = await supabase.from("wines").select("*");
    if (error) console.log("Error fetching wines", error);
    if (data) setWineData(data);
  }

  const [filteredWineData, setFilteredWineData] = useState([]);

  const addWine = async (wine) => {
    // Add the new wine to the Supabase table
    const { data, error } = await supabase.from("wines").insert([wine]);

    if (error) {
      console.error("Error adding wine", error);
    } else {
      // Update the wineData state after successful addition
      setWineData([...wineData, data[0]]);
    }
  };

  const deleteWine = async (wineId) => {
    const { error } = await supabase.from("wines").delete().eq("id", wineId);
    if (error) {
      console.log("Error deleting wine", error);
    } else {
      // Update the wineData state after successful deletion
      setWineData(wineData.filter((wine) => wine.id !== wineId));
    }
  };

  const contextValue = {
    wineData,
    addWine,
    deleteWine,
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

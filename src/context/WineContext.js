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
    // Fetch initial wine data
    getWines();

    // Set up a periodic refresh every 5 seconds (adjust as needed)
    const intervalId = setInterval(() => {
      getWines();
    }, 5000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId); // Use intervalId instead of refreshInterval
    };
  }, []); // Remove refreshInterval fro

  async function getWines() {
    try {
      const { data, error } = await supabase.from("wines").select("*");

      if (error) {
        console.error("Error fetching wines", error);
        return;
      }

      if (data) {
        setWineData(data);
      }
    } catch (error) {
      console.error("Unexpected error fetching wines", error);
    }
  }

  const [filteredWineData, setFilteredWineData] = useState([]);

  const addWine = async (wine) => {
    try {
      const { data, error } = await supabase.from("wines").insert([wine]);

      if (error) {
        console.error("Error adding wine", error);
        return;
      }

      if (data && data.length > 0) {
        setWineData([...wineData, data[0]]);
      }
    } catch (error) {
      console.error("Unexpected error adding wine", error);
    }
  };

  const deleteWine = async (wineId) => {
    const { error } = await supabase.from("wines").delete().eq("id", wineId);

    if (error) {
      console.error("Error deleting wine", error);
    } else {
      setWineData((prevData) => prevData.filter((wine) => wine.id !== wineId));
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

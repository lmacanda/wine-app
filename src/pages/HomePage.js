import WineList from "../components/wineList/WineList";
import Filter from "../components/filter/Filter";

function HomePage() {
  return (
    <div>
      <h1>Wine Menu</h1>
      <Filter />

      <WineList />
    </div>
  );
}

export default HomePage;

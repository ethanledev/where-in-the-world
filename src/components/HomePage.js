import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import { ReactComponent as SearchIcon } from "../icons/search.svg";
import { ReactComponent as DownArrowhead } from "../icons/down-arrowhead.svg";
import CountryOverview from "./CountryOverview";
import { formatPopulation } from "../utils";

const HomePage = () => {
  const [countryList, setCountryList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");
  const [showRegions, setShowRegions] = useState(false);

  const fetchCountries = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryList(data);
      });
  };

  useEffect(() => {
    if (region === "all") {
      fetchCountries("https://restcountries.com/v2/all");
    } else {
      fetchCountries("https://restcountries.com/v2/region/" + region);
    }
  }, [region]);

  useEffect(() => {
    const filterList = () => {
      const list = countryList.filter((country) => {
        const name = country.name.toLowerCase();
        const target = search.toLowerCase();
        return name.includes(target);
      });
      setFilteredList(list);
    };

    filterList();
  }, [countryList, search]);

  const renderRegionOptions = () => {
    return ["all", "africa", "americas", "asia", "europe", "oceania"].map(
      (regionOption) => (
        <div
          key={regionOption}
          className={region === regionOption ? styles.active : null}
          onClick={() => {
            setRegion(regionOption);
            setShowRegions(false);
          }}
        >
          {regionOption}
        </div>
      )
    );
  };

  const renderCountryOverview = () => {
    return filteredList.map((country) => (
      <CountryOverview
        key={country.name}
        name={country.name}
        population={formatPopulation(country.population)}
        region={country.region}
        capital={country.capital}
        flag={country.flags.png}
        code={country.alpha3Code}
      />
    ));
  };

  return (
    <main className={styles.main}>
      <h1 className="srOnly">List of Countries</h1>
      <div className={styles.filterBar}>
        <div className={styles.input}>
          <SearchIcon />
          <label htmlFor="search" className="srOnly">
            Search
          </label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.regionFilter}>
          <div
            className={styles.regionFilterHeader}
            onClick={() => setShowRegions(!showRegions)}
          >
            <span>
              Filter by Region:{" "}
              <span className={styles.currentRegion}>{region}</span>
            </span>
            <DownArrowhead />
          </div>
          {showRegions && (
            <div className={styles.regions}>{renderRegionOptions()}</div>
          )}
        </div>
      </div>
      <div className={styles.countryList}>{renderCountryOverview()}</div>
    </main>
  );
};

export default HomePage;

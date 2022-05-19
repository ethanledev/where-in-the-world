import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import { ReactComponent as SearchIcon } from "../icons/search.svg";
import { ReactComponent as DownArrowhead } from "../icons/down-arrowhead.svg";
import CountryOverview from "./CountryOverview";

const HomePage = () => {
  const [countryList, setCountryList] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");
  const [showRegions, setShowRegions] = useState(false);
  const [timer, setTimer] = useState(null);

  const fetchCountries = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCountryList(data);
        } else {
          setCountryList([]);
        }
      });
  };

  useEffect(() => {
    setSearch("");
    if (region === "all") {
      fetchCountries("https://restcountries.com/v2/all");
    } else {
      fetchCountries("https://restcountries.com/v2/region/" + region);
    }
  }, [region]);

  const handleSearchChange = (e) => {
    const name = e.target.value;
    setSearch(name);
    // clearTimeout(timer);

    // const newTimer = setTimeout(() => {
    //   if (name === "") {
    //     fetchCountries("https://restcountries.com/v2/all");
    //   } else {
    //     fetchCountries("https://restcountries.com/v3.1/name/" + name);
    //   }
    // }, 500);

    // setTimer(newTimer);
  };

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

  const formatPopulation = (num) => {
    const array = num.toString().split("");
    const numDigits = array.length;
    const numCommas = Math.floor(numDigits / 3);
    for (let i = 1; i <= numCommas; i++) {
      const index = numDigits - i * 3;
      if (index !== 0) {
        array.splice(index, 0, ",");
      }
    }
    const populationStr = array.join("");
    return populationStr;
  };

  const renderCountryOverview = () => {
    return countryList.map((country) => (
      <CountryOverview
        key={country.name}
        name={country.name}
        population={formatPopulation(country.population)}
        region={country.region}
        capital={country.capital}
        flag={country.flags.png}
      />
    ));
  };

  return (
    <main className={styles.main}>
      <h1 className="srOnly">List of Countries</h1>
      <div className={styles.filterBar}>
        <div className={styles.input}>
          <SearchIcon />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e)}
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

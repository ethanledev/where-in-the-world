import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatPopulation } from "../utils";
import styles from "./CountryPage.module.css";

const CountryPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const { code } = params;

    const getInfo = (list) => {
      const country = list.filter((data) => data.alpha3Code === code);
      console.log(country[0]);
      if (country[0].borders) {
        let borderCoutries = [];
        for (let borderCode of country[0].borders) {
          const borderCountry = list.filter(
            (data) => data.alpha3Code === borderCode
          );
          borderCoutries.push({
            code: borderCode,
            name: borderCountry[0].name,
          });
        }
        country[0].borders = borderCoutries;
      }
      setInfo(country[0]);
    };

    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => getInfo(data));
  }, [params]);

  const populateInfoArray = (array) => {
    const result = [];
    for (let i = 0; i < array.length; i++) {
      const info =
        array[i].name + (array[i].symbol ? " (" + array[i].symbol + ")" : "");
      result.push(info);
    }
    return result.join(", ");
  };

  const renderBorderCoutryButton = () => {
    return info.borders.map((border) => (
      <button
        key={border.code}
        className={styles.borderButton}
        onClick={() => navigate("/where-in-the-world/" + border.code)}
      >
        {border.name}
      </button>
    ));
  };

  return (
    <main className={styles.main}>
      <button
        className={styles.backButton}
        onClick={() => navigate("/where-in-the-world")}
      >
        <span>&#8592;</span> Back
      </button>
      {info && (
        <div className={styles.content}>
          <img src={info.flags.png} alt={info.name + "flag"} />
          <div className={styles.info}>
            <h1>{info.name}</h1>
            <div className={styles.details}>
              <div>
                <p>
                  <span>Native Name: </span>
                  <span>{info.nativeName}</span>
                </p>
                <p>
                  <span>Population: </span>
                  <span>{formatPopulation(info.population)}</span>
                </p>
                <p>
                  <span>Region: </span>
                  <span>{info.region}</span>
                </p>
                <p>
                  <span>Sub Region: </span>
                  <span>{info.subregion}</span>
                </p>
                <p>
                  <span>Capital: </span>
                  <span>{info.capital}</span>
                </p>
              </div>
              <div>
                <p>
                  <span>Top Level Domain: </span>
                  <span>{info.topLevelDomain}</span>
                </p>
                <p>
                  <span>Currencies: </span>
                  <span>{populateInfoArray(info.currencies)}</span>
                </p>
                <p>
                  <span>Languages: </span>
                  <span>{populateInfoArray(info.languages)}</span>
                </p>
              </div>
            </div>
            {info.borders && (
              <div className={styles.borderCoutries}>
                <div>Border Countries:</div>
                {renderBorderCoutryButton()}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default CountryPage;

import { useNavigate } from "react-router-dom";
import styles from "./CountryOverview.module.css";

const CountryOverview = ({ name, population, region, capital, flag, code }) => {
  const navigate = useNavigate();

  return (
    <article
      className={styles.article}
      onClick={() => navigate("/where-in-the-world/" + code)}
    >
      <img src={flag} alt={name + " flag"} className={styles.flag} />
      <h2>{name}</h2>
      <div className={styles.info}>
        <p>
          <span>Population:</span>
          <span>{population}</span>
        </p>
        <p>
          <span>Region:</span>
          <span>{region}</span>
        </p>
        <p>
          <span>Capital:</span>
          <span>{capital}</span>
        </p>
      </div>
    </article>
  );
};

export default CountryOverview;

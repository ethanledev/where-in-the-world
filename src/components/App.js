import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import CountryPage from "./CountryPage";
import HomePage from "./HomePage";

const App = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className={styles.container} data-theme={theme}>
      <header className={styles.header}>
        <h1>Where in the world?</h1>
        <label className={styles.switch}>
          <input type="checkbox" onChange={(e) => toggleTheme(e)} />
          <span className={styles.slider}>
            <img src={require("../icons/dark-mode.png")} alt="moon icon" />
            <img src={require("../icons/light-mode.png")} alt="sun icon" />
          </span>
        </label>
      </header>
      <Routes>
        <Route path="/where-in-the-world" element={<HomePage />} />
        <Route path="/where-in-the-world/:code" element={<CountryPage />} />
      </Routes>
    </div>
  );
};

export default App;

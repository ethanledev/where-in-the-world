import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import CountryPage from "./CountryPage";
import HomePage from "./HomePage";

const App = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div className={styles.container} data-theme={theme}>
      <header className={styles.header}>
        <h1>Where in the world?</h1>
        <div className={styles.themeButton} onClick={toggleTheme}>
          <img
            src={theme === "light" ? "/dark-mode.png" : "/light-mode.png"}
            alt={theme === "light" ? "moon icon" : "sun icon"}
          />{" "}
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </div>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path=":id" element={<CountryPage />} />
      </Routes>
    </div>
  );
};

export default App;

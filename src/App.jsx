import { useState, useEffect } from "react";
import "./App.css";

import { fetchWeather } from "./fetchWeather.js";
import Header from "./header.jsx";
import LoginForm from "./loginForm.jsx";
import Hourly from "./hourly.jsx";
import Daily from "./daily.jsx";
import Primary from "./primary.jsx";
import Loading from "./loading.jsx";
import Sugglist from "./sugglist.jsx";

function App() {
  const [loading, setLoading] = useState(false); // fix it later
  const [city, setCity] = useState("Kolkata");
  const [sign, setSign] = useState({ username: "", password: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [weather, setWeather] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState("");

  const monthnames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const newdata = await fetchWeather(city);
      setLoading(false);
      console.log("weather data fetched successfully", newdata);
      newdata
        ? setWeather(newdata)
        : (setWeather(null),
          setCity("Kolkata"),
          setLoading(false));
    }
    loadData();
  }, [city]); // refetch whenever city changes

  return (
    <>
      <div id="main">
        <Header
          setIsOpen={setIsOpen}
          setCity={setCity}
          sign={sign}
          setSign={setSign}
          setSuggestions={setSuggestions}
          setInput={setInput}
          input={input}
        />

        <div id="main-2" style={{ filter: loading ? "blur(5px)" : "none" }}>
          <div id="left">
            <div>
              <Primary weather={weather} city={city} monthnames={monthnames} />
            </div>
            <div>
              <Hourly weather={weather} monthnames={monthnames} />
            </div>
          </div>

          <Daily weather={weather} monthnames={monthnames} />
        </div>

        <LoginForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setSign={setSign}
          sign={sign}
        />
      </div>

      {loading && <Loading />}

      <Sugglist
        suggestions={suggestions}
        setSuggestions={setSuggestions}
        setInput={setCity}
      />
    </>
  );
}

export default App;

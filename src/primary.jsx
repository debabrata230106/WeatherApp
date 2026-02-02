import "./primary.css";
import Compass from "./compass.jsx";
import { useEffect, useState } from "react";

async function fetchAQI(cityName) {
  const token = "fdadfa32e204d5a9f2a1cda30ac193a7dd15afa3";

  try {
    const res = await fetch(
      `https://api.waqi.info/feed/${encodeURIComponent(cityName)}/?token=${token}`,
    );
    const data = await res.json();

    // If API returns ok, return AQI number, else 0
    return data.status === "ok" ? parseInt(data.data.aqi) : -1;
  } catch (err) {
    console.error("Error fetching AQI:", err);
    return -1; // network error or any other issue
  }
}

export default function Primary({ weather, city, monthnames }) {
  const [aqi, setAqi] = useState(-1);

  useEffect(() => {
    let active = true;
    if (!city) {
      setAqi(-1);
      return;
    }
    fetchAQI(city).then((val) => {
      if (active) setAqi(val);
    });
    return () => {
      active = false;
    };
  }, [city]);

  // Safety check to prevent errors before data loads
  if (!weather || !weather.currentData) {
    return <></>;
  }

  const currentWeather = weather.currentData;
  const monthname = monthnames[Number(currentWeather.month) - 1];
  const windspeed = currentWeather.windspeed.split(" ")[0];
  // 2. Determine which icon to show
  const tempValue = parseFloat(currentWeather.temperature.split(" ")[0]);
  let tempIcon;
  if (tempValue >= 30) {
    tempIcon = (
      <i className="fa-solid fa-fire" style={{ color: "#ff4500" }}></i>
    ); // Hot
  } else if (tempValue >= 10) {
    tempIcon = (
      <i
        className="fa-solid fa-temperature-low"
        style={{ color: "#4fc1ff" }}
      ></i>
    ); // Mild/Cool
  } else {
    tempIcon = (
      <i className="fa-regular fa-snowflake" style={{ color: "#a5f3fc" }}></i>
    ); // Cold
  }

  const dayNight = currentWeather.dayOrNight;
  let dayNightIcon;
  dayNight
    ? (dayNightIcon = <i class="fa-solid fa-sun"></i>)
    : (dayNightIcon = <i class="fa-solid fa-moon"></i>);

  const cond = currentWeather.description;
  let condIcon;
  if (cond == "Cloudy") {
    condIcon = <i class="fa-solid fa-cloud"></i>;
  } else if (cond == "Light rain" || cond == "Rain") {
    condIcon = <i class="fa-solid fa-cloud-rain"></i>;
  } else if (cond == "Heavy rain") {
    condIcon = <i class="fa-solid fa-cloud-showers-heavy"></i>;
  } else if (cond == "Snow" || cond == "Heavy snow") {
    condIcon = <i class="fa-solid fa-snowflake"></i>;
  } else if (cond == "Thunderstorm" || cond == "Severe Thunderstorm") {
    condIcon = <i class="fa-solid fa-bolt"></i>;
  } else if (condIcon == "Foggy") {
    condIcon = <i class="fa-solid fa-smog"></i>;
  } else if (condIcon == "Thunderstorm with hail") {
    condIcon = <i class="fa-solid fa-cloud-meatball"></i>;
  } else {
    condIcon = <></>;
  }

  return (
    <div id="left1">
      <div id="left11">
        <div id="left111">
          <div id="left1111">
            <h1>
              {tempIcon} {tempValue} <span>°C</span>
            </h1>
            {aqi >= 0 && (
              <h5>
                <i className="fa-solid fa-lungs"></i>AQI<span>{aqi}</span>
              </h5>
            )}
          </div>
          <div id="left1112">
            <div>
              {condIcon}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{dayNightIcon}
            </div>
            <p>{currentWeather.description}</p>
          </div>
        </div>
        <div id="left112">
          <p id="city-name">{`${city}`}</p>
          <p>{`${currentWeather.time}`}</p>
          <p>{`${currentWeather.day} ${monthname} ${currentWeather.year}`}</p>
        </div>
      </div>
      <div id="left12">
        <div>
          <p>
            <i className="fa-solid fa-wind"></i> Windspeed
          </p>
          <h1>{windspeed}</h1>
          <h5>Km/h</h5>
        </div>
        <Compass degrees={currentWeather.winddirection} />
      </div>
    </div>
  );
}

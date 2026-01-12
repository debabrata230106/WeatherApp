import { useState, useEffect } from "react";
import "./hourly.css";

export default function Hourly({ weather, monthnames }) {
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (weather?.hourlyData) {
      setSelectedDate(Object.keys(weather.hourlyData)[0]);
    }
  }, [weather]);

  return (
    <div id="hourly">
      <h4><i class="fa-solid fa-clock"></i> Hourly Weather</h4>
      <div id="hourly-1">
        <div id="dates">
          {weather &&
            Object.keys(weather.hourlyData).map((each) => {
              return (
                <button
                  key={each}
                  id={each}
                  className={`date-btn ${
                    selectedDate === each ? "active" : ""
                  }`}
                  onClick={(e) => {
                    setSelectedDate(each);
                  }}
                >
                  <span className="date">{`${each.split("/")[0]}`}</span>
                  {` ${monthnames[Number(each.split("/")[1]) - 1].slice(0, 3)} ${each.split("/")[2]}`}
                </button>
              );
            })}
        </div>
        <div id="hourly-weather">
          {weather?.hourlyData?.[selectedDate] &&
            Object.keys(weather.hourlyData[selectedDate]).map((hour) => {
              const eachday = weather.hourlyData[selectedDate][hour];
              return (
                <div key={hour} className="hour">
                  <p id="hour">{hour}</p>
                  <h2 id="temp">{eachday.temperature}</h2>
                  <p className="small"><i class="fa-solid fa-droplet"></i> Humidity</p>
                  <h4>{eachday.humidity}</h4>
                  <p className="small"><i class="fa-solid fa-wind"></i> Windspeed</p>
                  <h4>{eachday.windspeed}</h4>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

import "./primary.css";
import Compass from "./compass.jsx";

export default function Primary({ weather, city, monthnames }) {
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
          <h1>
            {tempIcon} {tempValue} <span>°C</span>
          </h1>
          <div id="left1111">
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
          <p><i className="fa-solid fa-wind"></i> Windspeed</p>
          <h1>{windspeed}</h1>
          <h5>Km/h</h5>
        </div>
        <Compass degrees={currentWeather.winddirection} />
      </div>

      {/* <div>
        <h1>{currentWeather.temperature} {tempIcon}</h1>

        <>{condIcon} {dayNightIcon}</>
        <p>{currentWeather.description}</p>


       

        <p>Windspeed</p>
        <h3>{currentWeather.windspeed}</h3>
        <p>Winddirection</p>
        <h3>{currentWeather.winddirection}</h3>
      </div> */}
    </div>
  );
}

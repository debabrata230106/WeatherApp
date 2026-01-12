import "./header.css";
import Tooltip from "./tooltip.jsx";
import Search from "./search.jsx";

export default function Header({
  setIsOpen,
  setCity,
  sign,
  setSign,
  setInput,
  input,
  setSuggestions,
}) {
  return (
    <div id="main-1">
      <div id="main11">
        <img
          id="logo"
          src="https://cdn.jim-nielsen.com/ios/1024/weather-2019-02-07.png"
          alt="logo"
        />
        <p id="title">Weather App</p>
      </div>

      <Search
        setCity={setCity}
        input={input}
        setInput={setInput}
        setSuggestions={setSuggestions}
      />

      <div id="login-out">
        <button
          onClick={() => {
            sign.username && sign.password
              ? setSign({ username: "", password: "" })
              : setIsOpen(true);
          }}
        >
          {sign.username && sign.password ? <p>Logout</p> : <p>Login</p>}
          {sign.username && sign.password ? (
            <i className="fa-solid fa-right-from-bracket"></i>
          ) : (
            <i
              className="fa-solid fa-right-to-bracket"
              style={{ color: "rgba(255, 106, 106, 0.91)" }}
            ></i>
          )}
        </button>
      </div>

      <div id="user">
        <Tooltip
          username={sign.username} //prop
          password={sign.password} //prop
          childdiv={
            //prop
            <div
              id="user-info-display"
              style={{
                //inline style for more preference
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                padding: "0",
                margin: "0",
                fontSize: "22px",
                fontWeight: "lighter",
              }}
            >
              <i
                className="fa-solid fa-user"
                style={{ color: "cornflowerblue" }}
              ></i>
              <p>
                {sign.username && sign.password
                  ? `Hi, ${sign.username}`
                  : `Hi, User`}
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
}

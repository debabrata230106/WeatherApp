import "./header.css";

export default function SearchBox({
  setCity,
  input,
  setInput,
  setSuggestions,
}) {
  // Fetch suggestions when user types
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.length > 2) {
      try {
        //Api fetch
        const res = await fetch(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${value}&limit=5`,
          {
            headers: {
              "X-RapidAPI-Key":
                "5b288f3e54msh99844b727206cafp199441jsn0e60ee24b1da", // replace with your free key
              "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
            },
          }
        );
        const data = await res.json();
        setSuggestions(data.data.map((city) => city.city));
      } catch (err) {
        console.error("Error fetching city suggestions:", err);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setCity(input);
      setSuggestions([]);
    }
  };

  return (
    <div id="search">
      <input
        type="text"
        placeholder= {input ? "" : "Search by City"}
        name="city"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={() => {
          setCity(input);
          setSuggestions([]);
        }}
      >
        <i className="fa-solid fa-magnifying-glass-location"></i> Search
      </button>
    </div>
  );
}

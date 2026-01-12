
import { useState } from "react";


export default function Sugglist({ suggestions, setSuggestions, setInput }) {
const [isHovered, setIsHovered] = useState(false);

  if (suggestions.length === 0) {
    return <></>;
  }
  return (
    <ul
      style={{
        position: "absolute",
        top: "115px", // just below header height
        left: "550px",
        maxHeight: "400px",
        overflowY: "auto",
        textAlign: "left",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(5px)",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        padding: "5px",
        margin: "0",
        boxShadow: "0 0 20px rgba(255, 255, 255, 0.7)",
      }}
    >
      {suggestions.map((s, idx) => (
        <li
          style={{
            padding: "10px 20px",
            backgroundColor: isHovered ? "white" : "rgba(220, 220, 220, 1)",
            listStyle: "none",
            width: "300px",
            borderRadius: "5px",
            color: "black",
            cursor: "pointer",
            fontFamily: "revert",
            fontSize: "16px",
            fontWeight: "bold",
          }}
          key={idx}
          onClick={() => {
            setInput(s);
            setSuggestions([]);
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {s}
        </li>
      ))}
    </ul>
  );
}

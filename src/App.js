// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [inputValue, setInputValue] = useState(1);
  const [fromCurr, setFromCurr] = useState("USD");
  const [toCurr, setToCurr] = useState("EUR");
  const [display, setDisplay] = useState("");

  useEffect(
    function () {
      async function getConvertedValue() {
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${inputValue}&from=${fromCurr}&to=${toCurr}`
          );
          if (!res.ok) {
            throw new Error("failed to fetch data.");
          }
          const data = await res.json();
          if (!data.rates) {
            throw new Error("Invalid entry");
          }
          // console.log(data);
          const [convData] = Object.values(data.rates);
          setDisplay(convData);
          console.log(convData);
        } catch (error) {
          console.log(error.message);
        }
      }

      getConvertedValue();
    },
    [inputValue, fromCurr, toCurr]
  );

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(Number(e.target.value))}
      />
      <select value={fromCurr} onChange={(e) => setFromCurr(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCurr} onChange={(e) => setToCurr(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{display}</p>
    </div>
  );
}

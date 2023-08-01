import React, { useState } from "react";

export default function Persons({ onNext }) {
  const [numPersons, setNumPersons] = useState(1);

  const handleNext = () => {
    onNext(numPersons);
  };
  return (
    <div>
      <h1>Welcome to the Meal Expense Calculator</h1>
      <label htmlFor="numPersons">Number of Persons:</label>
      <input
        type="number"
        id="numPersons"
        value={numPersons}
        onChange={(e) => setNumPersons(parseInt(e.target.value))}
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

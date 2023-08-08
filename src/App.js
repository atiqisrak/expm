import React, { useState } from "react";
import "./App.css";
import Persons from "./Persons";
import Calculation from "./Calculation";

function App() {
  const [step, setStep] = useState(1); // Current step of the process
  const [numPersons, setNumPersons] = useState(1);

  const handleNext = (numPersons) => {
    setNumPersons(numPersons);
    setStep(2); // Move to the next step
  };

  return (
    <div>
      {step === 1 && <Persons onNext={handleNext} />}
      {step === 2 && <Calculation numPersons={numPersons} />}
    </div>
  );
}

export default App;

import React, { useState } from "react";

function Calculation({ numPersons }) {
  const [personsData, setPersonsData] = useState([]);

  const handleExpenseChange = (index, expense) => {
    const updatedPersonsData = [...personsData];
    updatedPersonsData[index] = { ...updatedPersonsData[index], expense };
    setPersonsData(updatedPersonsData);
  };

  const handleMealsChange = (index, meals) => {
    const updatedPersonsData = [...personsData];
    updatedPersonsData[index] = { ...updatedPersonsData[index], meals };
    setPersonsData(updatedPersonsData);
  };

  const calculateOwes = () => {
    const totalExpenses = personsData.reduce(
      (total, person) => total + (person.expense || 0),
      0
    );
    const totalMeals = personsData.reduce(
      (total, person) => total + (person.meals || 0),
      0
    );

    const averageExpensePerMeal = totalExpenses / totalMeals;

    const owesData = personsData.map((person) => ({
      ...person,
      owes: (person.meals || 0) * averageExpensePerMeal - (person.expense || 0),
    }));

    setPersonsData(owesData);
  };

  const handleReset = () => {
    setPersonsData([]);
  };

  // Function to convert Arabic numerals to Bengali numerals
  const convertToBengaliNumeral = (number) => {
    const arabicNumerals = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const bengaliNumerals = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

    const numStr = String(number);
    let convertedStr = "";

    for (let i = 0; i < numStr.length; i++) {
      const digit = numStr[i];
      const arabicIndex = arabicNumerals.indexOf(digit);
      if (arabicIndex !== -1) {
        convertedStr += bengaliNumerals[arabicIndex];
      } else {
        convertedStr += digit;
      }
    }

    return convertedStr;
  };

  return (
    <div>
      <h2>Enter Expenses and Meals for Each Person</h2>
      {Array.from({ length: numPersons }).map((_, index) => (
        <div key={index}>
          <h3>Person {index + 1}</h3>
          <label htmlFor={`expense-${index}`}>Expense:</label>
          <input
            type="number"
            id={`expense-${index}`}
            value={personsData[index]?.expense || ""}
            onChange={(e) =>
              handleExpenseChange(index, parseFloat(e.target.value))
            }
          />
          <label htmlFor={`meals-${index}`}>Number of Meals:</label>
          <input
            type="number"
            id={`meals-${index}`}
            value={personsData[index]?.meals || ""}
            onChange={(e) => handleMealsChange(index, parseInt(e.target.value))}
          />
        </div>
      ))}
      <button onClick={calculateOwes}>Calculate</button>
      <button onClick={handleReset}>Reset</button> {/* New reset button */}
      <h2>Calculated Owes</h2>
      <table>
        <thead>
          <tr>
            <th>Person</th>
            <th>Expense</th>
            <th>Meals</th>
            <th>Owes</th>
          </tr>
        </thead>
        <tbody>
          {personsData.map((person, index) => (
            <tr key={index}>
              <td>Person {index + 1}</td>
              <td>৳{person.expense || 0}</td>
              <td>{person.meals || 0}</td>
              <td>
                {person.owes > 0
                  ? `${convertToBengaliNumeral(person.owes.toFixed(2))} Payable`
                  : person.owes < 0
                  ? `${convertToBengaliNumeral(
                      (-person.owes).toFixed(2)
                    )} Receivable`
                  : "Settled"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calculation;

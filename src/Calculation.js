import React, { useState } from "react";

function Calculation({ numPersons }) {
  const [personsData, setPersonsData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [personNames, setPersonNames] = useState(Array(numPersons).fill(""));

  const handleNameChange = (index, name) => {
    const updatedNames = [...personNames];
    updatedNames[index] = name;
    setPersonNames(updatedNames);
  };

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
    setShowPopup(true);
  };

  const handleReset = () => {
    setPersonsData([]);
    setShowPopup(false);
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
    <div className="container">
      <h2>Enter Expenses and Meals</h2>
      {Array.from({ length: numPersons }).map((_, index) => (
        <div key={index}>
          <h3>Person {index + 1}</h3>
          <label htmlFor={`name-${index}`}>Name:</label>
          <input
            type="text"
            id={`name-${index}`}
            value={personNames[index]}
            onChange={(e) => handleNameChange(index, e.target.value)}
          />
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

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-btn" onClick={() => setShowPopup(false)}>
              x
            </button>
            {/* Table content */}
            <h2>Calculated Owes</h2>
            <div className="desktop-table">
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
                      <td>{personNames[index]}</td>
                      <td>৳{person.expense || 0}</td>
                      <td>{person.meals || 0}</td>
                      <td>
                        {person.owes > 0
                          ? `${convertToBengaliNumeral(
                              person.owes.toFixed(2)
                            )} `
                          : person.owes < 0
                          ? `${convertToBengaliNumeral(
                              (-person.owes).toFixed(2)
                            )} `
                          : "Settled "}
                        <span
                          className={
                            person.owes > 0
                              ? "receivable"
                              : person.owes < 0
                              ? "payable"
                              : ""
                          }
                        >
                          {person.owes > 0
                            ? "পাবে"
                            : person.owes < 0
                            ? "দেবে"
                            : "ক্লিয়ার"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mobile-table">
              <table>
                {/* <thead>
                  <tr>
                    <th>Person</th>
                    <th>Expense</th>
                    <th>Meals</th>
                    <th>Owes</th>
                  </tr>
                </thead> */}
                <tbody>
                  {personsData.map((person, index) => (
                    <tr key={index}>
                      <td>Person {index + 1}</td>
                      <td>
                        <tr>৳{person.expense || 0}</tr>
                        <tr>{person.meals || 0}</tr>
                        <tr>
                          {person.owes > 0
                            ? `${convertToBengaliNumeral(
                                person.owes.toFixed(2)
                              )} `
                            : person.owes < 0
                            ? `${convertToBengaliNumeral(
                                (-person.owes).toFixed(2)
                              )} `
                            : "Settled "}
                          <span
                            className={
                              person.owes > 0
                                ? "receivable"
                                : person.owes < 0
                                ? "payable"
                                : ""
                            }
                          >
                            {person.owes > 0
                              ? "Receivable"
                              : person.owes < 0
                              ? "Payable"
                              : "Settled"}
                          </span>
                        </tr>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="reset-btn" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calculation;

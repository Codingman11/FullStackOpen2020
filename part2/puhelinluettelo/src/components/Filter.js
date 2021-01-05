import React from "react";

const Filter = ({ persons }) => {
  const filterPerson = (event) => {
    persons.filter((person) => {
      if (person.name.toLowerCase().search(event.target.value) !== 1) {
        console.log("Löydettiin");
      }
      return;
    });
  };
  return (
    <div>
      filter shown with <input onChange={filterPerson} />
    </div>
  );
};

export default Filter;

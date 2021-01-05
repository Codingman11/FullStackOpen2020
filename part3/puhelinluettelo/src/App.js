import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";

import personService from "./services/persons";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.filter((person) => person.name === newName).length > 0) {
      if (
        window.confirm(
          newName +
            " is on jo lisätty. Korvataako kyseisen henkilön numero uudella numerolla?"
        )
      ) {
        updatePerson(persons.find((p) => p.name === newName));
      }
      alert(`${newName} on jo luettelossa!`);
      return;
    }
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleNameChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  };

  const deletePers = (event, id) => {
    event.preventDefault();
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name} ?`))
      personService
        .deletePerson(id)
        .then((deletedPerson) => {
          console.log(person.name, "Deleted");
        })
        .catch((error) => {
          console.log(error.message);
        });

    window.location.reload();
  };

  const updatePerson = (person) => {
    const oldPerson = persons.map((p) => p.name === person.name);
    const updatedPerson = { ...oldPerson, number: newNumber };
    personService
      .update(updatedPerson.id, updatedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== oldPerson.id ? person : returnedPerson
          )
        );
      })
      .catch((error) => {
        alert("Something went wrong");
      });
    window.location.reload();
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        name={newName}
        number={newNumber}
        onChange1={handleNameChange}
        onChange2={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Person
            key={person.id}
            id={person.id}
            name={person.name}
            number={person.number}
            onClick={deletePers}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;

import { useState } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const onSubmit = (event) => {
    event.preventDefault();

    if (isPersonAlreadyInPhonebook(newName)) {
      return alert(`${newName} is already added to phonebook`);
    }

    setPersons(persons.concat({ name: newName }));
    setNewName('');
  };
  const onNameChange = (event) => {
    setNewName(event.target.value)
  };
  const isPersonAlreadyInPhonebook = (name) => persons.findIndex((person) => person.name === name) >= 0;

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm newName={newName} onNameChange={onNameChange} onSubmit={onSubmit} />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App
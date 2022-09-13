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
    setPersons(persons.concat({ name: newName }));
    setNewName('');
  };
  const onNameChange = (event) => {
    setNewName(event.target.value)
  };

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
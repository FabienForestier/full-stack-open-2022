import { useEffect, useState } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    personsService.getAll().then((personsInDB) => {
      setPersons(personsInDB);
    });
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault();

    if (isPersonAlreadyInPhonebook(name)) {
      return alert(`${name} is already added to phonebook`);
    }

    const addedPerson = await personsService.add({ name, phoneNumber })
    setPersons(persons.concat(addedPerson));
    setName('');
    setPhoneNumber('');
  };
  const onNameChange = (event) => {
    setName(event.target.value)
  };
  const onPhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value)
  };
  const onSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  };
  const isPersonAlreadyInPhonebook = (name) => persons.findIndex((person) => person.name === name) >= 0;
  const isPersonMatching = (person) => person.name.toLowerCase().includes(searchTerm);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} onChange={onSearchTermChange} />
      <h2>Add new contacts</h2>
      <PersonForm name={name} onNameChange={onNameChange} onSubmit={onSubmit} phoneNumber={phoneNumber} onPhoneNumberChange={onPhoneNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons.filter(isPersonMatching)} />
    </div>
  )
}

export default App
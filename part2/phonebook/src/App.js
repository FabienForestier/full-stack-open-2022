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
    const existingPerson = findPersonInPhonebook(name);

    if (!existingPerson) {
      return addPerson({ name, phoneNumber });
    }

    if (existingPerson && window.confirm(`${name} is already added to phonebook, do you want to update the phone number ?`)) {
      return updatePerson(existingPerson);
    }
  };
  const onDeleteClicked = async (person) => {
    if (window.confirm(`Do you want to delete ${person.name}`)) {
      await personsService.deleteById(person.id);
      setPersons(persons.filter((p) => p.id !== person.id));
    }
  }
  const onNameChange = (event) => {
    setName(event.target.value)
  };
  const onPhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value)
  };
  const onSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  };
  const findPersonInPhonebook = (name) => persons.find((person) => person.name === name);
  const isPersonMatching = (person) => person.name.toLowerCase().includes(searchTerm);
  const updatePerson = async (personToUpdate) => {
    const updatedContact = await personsService.update({ ...personToUpdate, phoneNumber });
    setPersons(persons.map((person) => person.id === personToUpdate.id ? updatedContact : person));
    resetForm();
  }
  const addPerson = async (personToAdd) => {
    const addedPerson = await personsService.add(personToAdd)
    setPersons(persons.concat(addedPerson));
    resetForm();
  }
  const resetForm = () => {
    setName('');
    setPhoneNumber('');
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} onChange={onSearchTermChange} />
      <h2>Add new contacts</h2>
      <PersonForm name={name} onNameChange={onNameChange} onSubmit={onSubmit} phoneNumber={phoneNumber} onPhoneNumberChange={onPhoneNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons.filter(isPersonMatching)} onDeleteClicked={onDeleteClicked} />
    </div>
  )
}

export default App
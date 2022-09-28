import { useEffect, useState } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import personsService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((personsInDB) => {
      setPersons(personsInDB);
    });
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault();
    const existingPerson = findPersonInPhonebook(name);

    if (!existingPerson) {
      return addPerson({ name, number });
    }

    if (existingPerson && window.confirm(`${name} is already added to phonebook, do you want to update the phone number ?`)) {
      return updatePerson(existingPerson);
    }
  };
  const onDeleteClicked = async (person) => {
    if (window.confirm(`Do you want to delete ${person.name}`)) {
      try {
        await personsService.deleteById(person.id);
        displayNotification(`Deleted ${person.name} information`);
      } catch {
        displayNotification(`Information of ${person.name} has already been removed from server.`, 'error')
      }
      setPersons(persons.filter((p) => p.id !== person.id));
    }
  }
  const onNameChange = (event) => {
    setName(event.target.value)
  };
  const onNumberChange = (event) => {
    setNumber(event.target.value)
  };
  const onSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  };
  const findPersonInPhonebook = (name) => persons.find((person) => person.name === name);
  const isPersonMatching = (person) => person.name.toLowerCase().includes(searchTerm);
  const updatePerson = async (personToUpdate) => {
    const updatedContact = await personsService.update({ ...personToUpdate, number });
    setPersons(persons.map((person) => person.id === personToUpdate.id ? updatedContact : person));
    resetForm();
    displayNotification(`Updated ${updatedContact.name}`);
  }
  const addPerson = async (personToAdd) => {
    const addedPerson = await personsService.add(personToAdd)
    setPersons(persons.concat(addedPerson));
    resetForm();
    displayNotification(`Added ${addedPerson.name}`);
  }
  const resetForm = () => {
    setName('');
    setNumber('');
  }
  const displayNotification = (message, type = 'success') => {
    setNotificationMessage({ message, type });
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000);
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notificationMessage} />
      <Filter searchTerm={searchTerm} onChange={onSearchTermChange} />
      <h2>Add new contacts</h2>
      <PersonForm name={name} onNameChange={onNameChange} onSubmit={onSubmit} number={number} onNumberChange={onNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons.filter(isPersonMatching)} onDeleteClicked={onDeleteClicked} />
    </div>
  )
}

export default App
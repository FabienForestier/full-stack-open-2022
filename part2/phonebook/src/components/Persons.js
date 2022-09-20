import Person from "./Person";

const Persons = ({ persons, onDeleteClicked }) => persons.map(person => <Person key={person.id} person={person} onDeleteClicked={onDeleteClicked} />);

export default Persons;
const Person = ({ person, onDeleteClicked }) => <p>
    {person.name} {person.phoneNumber} <button onClick={() => onDeleteClicked(person)}>Delete</button>
</p>

export default Person;
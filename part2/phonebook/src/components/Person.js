const Person = ({ person, onDeleteClicked }) => <p>
    {person.name} {person.number} <button onClick={() => onDeleteClicked(person)}>Delete</button>
</p>

export default Person;
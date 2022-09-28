const PersonForm = ({ onSubmit, onNameChange, name, onNumberChange, number }) => <form onSubmit={onSubmit}>
    <div>
        name: <input value={name} onChange={onNameChange} />
    </div>
    <div>
        phone: <input value={number} onChange={onNumberChange} />
    </div>
    <div>
        <button type="submit">add</button>
    </div>
</form>

export default PersonForm;
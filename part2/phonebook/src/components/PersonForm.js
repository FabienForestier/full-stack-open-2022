const PersonForm = ({ onSubmit, onNameChange, newName }) => <form onSubmit={onSubmit}>
    <div>
        name: <input value={newName} onChange={onNameChange} />
    </div>
    <div>
        <button type="submit">add</button>
    </div>
</form>

export default PersonForm;
const PersonForm = ({ onSubmit, onNameChange, name, onPhoneNumberChange, phoneNumber }) => <form onSubmit={onSubmit}>
    <div>
        name: <input value={name} onChange={onNameChange} />
    </div>
    <div>
        phone: <input value={phoneNumber} onChange={onPhoneNumberChange} />
    </div>
    <div>
        <button type="submit">add</button>
    </div>
</form>

export default PersonForm;
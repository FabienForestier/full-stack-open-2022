import axios from 'axios';

const personsUrl = 'http://localhost:3001/persons'

const getAll = async () => {
    const { data: persons } = await axios.get(personsUrl)
    return persons;
}

const add = async (newPerson) => {
    const { data: addedPerson } = await axios.post(personsUrl, newPerson);
    return addedPerson;
}

const personsService = { getAll, add };

export default personsService;
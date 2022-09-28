import axios from 'axios';

const personsUrl = '/api/persons'

const getAll = async () => {
    const { data: persons } = await axios.get(personsUrl)
    return persons;
}

const add = async (newPerson) => {
    const { data: addedPerson } = await axios.post(personsUrl, newPerson);
    return addedPerson;
}

const update = async (personToUpdate) => {
    const { data: updatedPerson } = await axios.put(`${personsUrl}/${personToUpdate.id}`, personToUpdate);
    return updatedPerson;
}

const deleteById = (id) => {
    return axios.delete(`${personsUrl}/${id}`);
}

const personsService = { getAll, add, update, deleteById };

export default personsService;
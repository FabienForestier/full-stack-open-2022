require('dotenv').config()
const mongoose = require('mongoose')

// Should be used as follow
// Fetching all the entries: node mongo.js
// Adding a person to the phonebook node mongo.js "James Bond" 007007007007

const url = process.env.MONGODB_URL
const newPersonName = process.argv[2]
const newPersonNumber = process.argv[3]

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(() => {
    if (newPersonName && newPersonNumber) {
      const person = new Person({
        name: newPersonName,
        number: newPersonNumber,
      })
      return person.save().then(() => {
        console.log('Added', newPersonName, newPersonNumber, 'to phonebook')
      })
    }

    return Person.find({}).then(result => {
      console.log('Phonebook:')
      result.forEach(person => {
        console.log(person.name, person.number)
      })
    })

  })
  .then(() => {
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
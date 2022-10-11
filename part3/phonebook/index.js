require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
morgan.format('custom', (tokens, req, res) => {
    const tiny = [req.method, req.url, req.status, tokens.res(req, res, 'content-length'), '-', tokens['response-time'](req, res), 'ms'];
    return req.method === 'POST' ? [...tiny, tokens.body(req)].join(' ') : tiny.join(' ');
})

const app = express();

app.use(cors())
app.use(express.json());
app.use(morgan('custom'));
app.use(express.static('frontend-build'))

const Person = require('./models/person')

app.get('/', (_, response) => {
    response.send('<h1>Phone Book API</h1>');
});

app.get('/info', (_, response, next) => {
    Person.count().then((numberOfContacts) => {
        response.send(`<p>Phone book has info for ${numberOfContacts} persons</p><p>${new Date().toString()}</p>`);
    }).catch((error) => next(error));
});

app.get('/api/persons', (_, response) => {
    Person.find().then(persons => {
        response.json(persons)
    }).catch((error) => next(error))
});

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).exec().then((person) => {
        person ? response.json(person) : response.status(404).end();
    }).catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
    const personId = request.params.id;

    Person.findByIdAndRemove(personId).then(note => {
        response.status(204).end()
    }).catch(error => next(error))
});

app.post('/api/persons/', (request, response, next) => {
    const person = request.body;

    if (!person.name) {
        return response.status(400).json({
            error: 'Name missing'
        });
    }

    Person.findOne({ name: person.name }).exec().then((contactAlreadyExists) => {
        if (contactAlreadyExists) {
            return response.status(400).json({
                error: 'Name must be unique'
            });
        }

        if (!person.number) {
            return response.status(400).json({
                error: 'Number missing'
            });
        }

        const newPerson = new Person({
            name: person.name,
            number: person.number
        })

        return newPerson.save();
    }).then(savedPerson => {
        response.json(savedPerson)
    }).catch((error) => next(error));


});

app.put('/api/persons/:id', (request, response, next) => {
    const personId = request.params.id;

    if (!request.body.name || !request.body.number) {
        return response.status(400).send({ error: 'Invalid contact value, either missing name or number' });
    }

    const propertiesToUpdate = {
        name: request.body.name,
        number: request.body.number
    };

    Person.findByIdAndUpdate(personId, propertiesToUpdate, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
});

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
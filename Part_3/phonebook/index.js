const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
//app.use(morgan(':method :url :response-time'))

app.use(morgan(':method :url :response-time :body', {
  skip: (req, res) => req.method !== "POST" 
}));

morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})


app.get('/info', (request, response) => {
    const now = new Date()
    
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
        <p>${now}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
    let min = 0;
    let max = 99999999999;
    let random = Math.floor(Math.random() * (+max - +min)) + 
             +min;
  return String(random)
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name) {
    return response.status(422).json({ 
      error: 'name missing' 
    })
  }
  if (persons.find(person => person.name === body.name)) {
    return response.status(409).json({ 
      error: 'name already exists in the phonebook' 
    })
  }
  if (!body.number) {
    return response.status(422).json({ 
      error: 'number missing' 
    })
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}



app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


const express = require('express')
const db = require('./data/db.js')
const server = express()

server.use(express.json())

server.post('/api/users', (req, res) => {
  if (!req.body.name || !req.name.bio) {
    res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' })
  }
  else {
    db.insert(req.body)
      .then(user => {
        res.status(201).json(user)
      })
      .catch(() => {
        res.status(500).json({
          errorMessage: 'There was an error while saving the user to the database.'
        })
      })
  }
})

server.get('/api/users', (req,res) => {
  db.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(() => {
      res.status(500).json({
        errorMessage: 'The users information could not be retrieved.'
      })
    })
})

server.listen(8000, () => {
  console.log('Server is running on port 8000...')
})
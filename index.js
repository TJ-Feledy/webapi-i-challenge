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

server.get('/api/users/:id', (req, res) => {
  db.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user)
      }
      else {
        res.status(404).json({
          message: 'The user with the specified ID does not exist.'
        })
      }
    })
    .catch(() => {
      res.status(500).json({
        errorMessage: 'The user information could not be retrieved.'
      })
    })
})

server.delete('/api/users/:id', (req, res) => {
  db.remove(req.params.id)
    .then(user => {
      if (user && user > 0) {
        res.status(200).json({
          message: 'The user was Removed.'
        })
      }
      else {
        res.status(404).json({
          message: 'The user with the specified ID does not exist.'
        })
      }
    })
    .catch(() => {
      res.status(500).json({
        errorMessage: 'The user could not be removed.'
      })
    })
})

server.put('/api/users/:id', (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res.status(400).json({
      errorMessage: 'Please provide name and bio for the user.'
    })
  }
  else {
    db.update(req.params.id, req.body)
      .then(user => {
        if (user) {
          res.status(200).json(user)
        }
        else {
          res.status(404).json({
            message: 'The user with the specified ID does not exist.'
          })
        }
      })
      .catch(() => {
        res.status(500).json({
          errorMessage: 'The user information could not be modified.'
        })
      })

  }
})

server.listen(8000, () => {
  console.log('Server is running on port 8000...')
})
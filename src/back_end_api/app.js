const express = require('express')
const app = express()
const port = 3000

const db = require('./db.json')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/products', (req, res) => {
  res.setHeader("Content-Type", "application/json")
  res.send(JSON.stringify(db.products))
})

app.get('/scores', (req, res) => {
  if (req.url === undefined) {
      res.statusCode = 404;
      res.send("ERROR NOT FOUND");
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      const responseBody = JSON.stringify(scores);
      res.send(responseBody);
    }
})

app.post('/scores', function (req, res) {
  scores.push(req.body)
  scores = scores.sort((a,b)=> b.score - a.score).slice(0, 3)
  res.status(201).json(scores);
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
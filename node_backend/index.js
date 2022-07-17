const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();


const port = 3001
const Pool = require('pg').Pool

const pool = new Pool({
    host: 'pg',
    port: 4322,
    user: 'admin',
    password: 'Password10',
    database: 'testdata'
  });

  app.use(cors())
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({ extended: true })
  )
  app.get('/', (request, response) => {
    response.json({ info: 'It works!' })
  })
  app.get('/test_query', (request, response) => {
    let q = 'SELECT * FROM data ORDER BY id ASC';
    pool.query(q, (error, results) => {
      if (error) { throw error }
      response.status(200).json(results.rows)
    })
  })
  app.listen(port, () => {
    console.log(`running on port ${port}.`)
  })
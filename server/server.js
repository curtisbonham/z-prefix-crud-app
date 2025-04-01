const express = require('express');
const app = express();
const PORT = 3001;
const cors = require('cors');
const knex = require('knex')(require('./knexfile')[process.env.NODE_ENV || 'development']);

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/login', (req, res) => {
  knex('user')
    .select('userName', 'password')
    .then(data => {
      res.status(200).json(data);
    })
})

app.get('/items', (req, res) => {
  knex('item')
  .select('*')
  .then(data => {
    res.status(200).json(data)
  })
})

app.post('/signup', (req, res) => {

})

app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));
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

app.get('/users', (req, res) => {
  knex('user')
    .select('*')
    .then(data => {
      res.status(200).json(data); 
    })
})

app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));
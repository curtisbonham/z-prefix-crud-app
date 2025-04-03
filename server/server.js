const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3001;
const cors = require('cors');
const knex = require('knex')(require('./knexfile')[process.env.NODE_ENV || 'development']);

app.use(express.json());
app.use(cors());


app.get('/login', (req, res) => {
  knex('user')
    .select('username', 'password')
    .then(data => {
      res.status(200).json(data);
    })
})

app.get('/users', (req, res) => {
  knex('user')
    .select('*')
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

//ENDPOINT FOR SIGNUP BUTTON
app.post('/signup', (req, res) => {
  const {firstname, lastname, username, password} = req.body;
  // const hashedPassword =  bcrypt.hash(password, 10);

  if(!firstname || !lastname || !username ||!password){
    return res.status(400).json({
      message: 'Name, Username, and Password are required for Sign Up'
    });
  }
  knex('user')
  .insert({firstname, lastname, username, password})
  .returning('*')
  .then((data) => {
    res.status(201).json({
      message: 'Sign Up Successful!',
      data: data[0],
    });
  })
  .catch((err) => {
    console.error('Error with signing up:', err);
    res.status(500).json({
      message: 'An error occurred while signing up. Please try again later.'
    });
});
});

//ENDPOINT FOR LOGIN BUTTON
app.post('/login/auth', async (req, res) => {
  const { username, password} = req.body;
  // const hashedPassword =  bcrypt.hash(password, 10);

  if(!username || !password){
    return res.status(400).json({
      message: 'Username and Password are required for Login!'
    });
  }
 try{
  const user = await knex('user').where({username}).first();
  if(!user){
    return res.status(401).json({message: 'Invalid Username'});
  }
  if(user.password !== password) {
    return res.status(401).json({message: 'Invalid Password'});
  }
  const token = jwt.sign(
    {id: user.id, username: user.username},
    process.env.JWT_SECRET || 'default secret',
    {expiresIn: '1h'}
  );
  res.status(200).json({
    message: 'Login Successful!',
    token,
    user: {
      id: user.id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
    },
  })
 } catch (err){
  console.error('Error during login:', err);
  res.status(500).json({
    message: 'An error occurred during login. Please try again later.'
  });
 }
});

//ENDPOINT FOR GETTING SPECIFIC USER INVENTORY
app.get('/user/:id/inventory', (req, res) => {
  const userid = req.params.id;
  knex('item')
  .select('id', 'itemname', 'description', 'quantity')
  .where({userid})
  .then(data => {
    if(data.length === 0){
      return res.status(404).json({
        message: 'No inventory found for this user'
      })
    } else {
      res.status(200).json(data);
    }
  })
})

//ENDPOINT FOR GETTING ALL INVENTORY
app.get('/inventory', (req, res) => {
  knex('item')
  .select('*')
  .then(data => {
    if(data.length === 0){
      return res.status(401).json({
        message: 'No inventory found'
      })
    } else {
      res.status(200).json(data)
    }
  })
  })

  //ENDPOINT TO UPDATE USER INVENTORY
  app.patch('/updateInventory/:id', (req, res) => {
    const {id, ...data} = req.body;
    const userid  = req.params.id;

    if (!id || !userid) {
      return res.status(400).json({
        message: 'Item ID and User ID are required to update inventory.',
      });
    }
    knex('item')
      .where({ id })
      .update(data)
      .debug(true)
      .then(() => {
        res.status(200).json({
          message: 'User inventory updated successfully',
        });
      })
      .catch(err => {
        console.error('Error updating user inventory:', err);
        res.status(500).json({
          message: 'An error occurred while updating user inventory. Please try again later.',
        });
      });
  });

  //ENDPOINT TO ADD NEW ITEM TO USER INVENTORY
  app.post('/addItem/:id', (req, res) => {
    const userid = req.params.id;
    const { itemname, description, quantity } = req.body;

    if (!itemname || !description || !quantity) {
      return res.status(400).json({
        message: 'Item name, description, and quantity are required to add an item.',
      });
    }
    const newItem = {
      userid,
      itemname,
      description,
      quantity,
    };

    knex('item')
      .insert(newItem)
      .returning('*')
      .then((data) => {
        res.status(201).json({
          message: 'Item added successfully',
          item: data[0],
        });
      })
      .catch((err) => {
        console.error('Error adding item:', err)
        })
      });

  //ENDPOINT TO DELETE ITEM FROM USER INVENTORY
  app.delete('/deleteItem/:userid/:id', (req, res) => {
    const {userid, id} = req.params;

    if (!id || !userid) {
      return res.status(400).json({
        message: 'Item ID and User ID are required to delete an item.',
      });
    }
    knex('item')
      .where({ userid, id })
      .del()
      .then(() => {
        res.status(200).json({
          message: 'Item deleted successfully',
        });
      })
      .catch((err) => {
        console.error('Error deleting item:', err);
        res.status(500).json({
          message: 'An error occurred while deleting the item. Please try again later.'
        });
      })
  })

  //ENDPOINT TO GET A SPECIFIC ITEM DETAILS
  app.get('/details/item/:id', (req, res) => {
    const id = req.params.id

    if(!id){
      return res.status(400).json({
        message: 'Item not found'
      });
    }
    knex('item')
      .join('user', 'user.id', '=', 'item.userid' )
      .select('user.firstname', 'user.lastname', 'item.userid', 'item.id', 'item.itemname', 'item.quantity', 'item.description')
      .where('item.id', id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.error('Error retrieving item details:', err);
        res.status(500).json({
          message: 'An error occurred while retrieving the item details. Please try again later'
        });
      })
  })

app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));
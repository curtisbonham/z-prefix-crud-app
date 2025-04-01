const path = require('path');
const dotenv = require('dotenv');
require('dotenv').config()

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: process.env.PG_DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    }
  }

};

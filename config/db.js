const config = require('./index');

const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host : config.DB_HOST,
    port : config.DB_PORT,
    user : config.DB_USER,
    password : config.DB_PASSWORD,
    database : config.DB_NAME
  }
});



module.exports = {
  host: config.DB_HOST,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  port: config.DB_PORT,
  database: config.DB_NAME,
  dialect: 'mysql',
  dialectOptions: {
    connectTimeout: config.DB_CONNECT_TIMEOUT
  },
  pool: {
    max: +config.DB_POOL_MAXSIZE || 10,
    min: +config.DB_POOL_MINSIZE || 0,
    acquire: +config.DB_POOL_ACQUIRE,
    idle: +config.DB_POOL_IDLE
  },
  knex
}
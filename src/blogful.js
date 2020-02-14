require('dotenv').config()
const knex = require('knex')
const ArticlesService = require('../src/articles-service.js')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})

console.log(ArticlesService.getAllArticles())
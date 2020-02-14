require('dotenv').config()
const knex = require('knex')
const shoppingListService = require('./shopping-list-service.js')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})


  knexInstance
    .select('*')
    .from('shopping_list')
    
    .then(result => {
      console.log(result)
    })


    console.log(shoppingListService.getAllGoceries())





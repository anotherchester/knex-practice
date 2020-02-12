require('dotenv').config()
const knex = require('knex')

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





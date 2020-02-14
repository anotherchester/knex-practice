const shoppingListService = {

  getAllGroceries(knex) {
    return knex.select('*').from('shopping_list')
  },

  insertGrocery(knex, newGrocery) {
    return knex
      .insert(newGrocery)
      .into('shopping_list')
      .returning('*')
      .then(rows => rows[0])
  },

  getById(knex, id) {
    return knex
    .from('shopping_list')
    .select('*')
    .where('id', id)
    .first()
  },
}





module.exports = shoppingListService


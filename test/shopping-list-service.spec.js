const shoppingListService = require('../src/shopping-list-service.js')
const knex = require('knex')


describe(`Shopping list service object`, function () {

  let db
  let testGroceries = [
    {
      id: 1,
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      name: 'Fish stuff',
      category: 'Main',
      checked: false,
      price: '10.00'
    },
    {
      id: 2,
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      name: 'Kale items',
      category: 'Breakfast',
      checked: true,
      price: '11.99'
    },
    {
      id: 3,
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      name: 'Jalapeno taco',
      category: 'Main',
      checked: false,
      price: '12.20'
    },
  ]

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
  })

  before( () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
  })
  before(() => db('shopping_list').truncate())
  afterEach(() => db('shopping_list').truncate())
  after(() => db.destroy())

  context(`Given 'shopping_list' has data`, () => {
    beforeEach(() => {
      return db
        .into('shopping_list')
        .insert(testGroceries)
    })

  it(`'getAllGroceries' resolves all groceries from 'shopping_list' table`, () => {
      //test that shoppingListService.getAllGroceries gets data from table
      return shoppingListService.getAllGroceries(db)
        .then(actual => {
          expect(actual).to.eql(testGroceries.map(grocery => ({
            ...grocery,
            date_added: new Date(grocery.date_added)
          })))
        })
    })


  context(`Given 'shopping_list' has no data`, () => {
      it(`getGroceries() resolves an empty array`, () => {
        return shoppingListService.getAllGroceries(db)
          .then(actual => {
            expect(actual).to.eql([])
          })
      })

  it(`insertGrocery() inserts a new item and resolves the new item with an 'id'`, () => {
        const newGrocery = {
          id: 1,
          name: 'Test new name',
          category: 'Main',
          date_added: new Date('2020-01-01T00:00:00.000Z'),
          price: '0.00',
          checked: false,
        }
        return shoppingListService.insertGrocery(db, newGrocery)
          .then(actual => {
            expect(actual).to.eql({
              id: 1,
              name: newGrocery.name,
              category: newGrocery.category,
              price: newGrocery.price,
              date_added: new Date(newGrocery.date_added),
              checked: newGrocery.checked,  
            })
          })
      })

  it(`getById() resolves an item by id from 'shopping_list' table`, () => {
             const thirdId = 3
             const thirdTestGrocery = testGroceries[thirdId - 1]
             return shoppingListService.getById(db, thirdId)
               .then(actual => {
                 expect(actual).to.eql({
                   id: thirdId,
                   name: thirdTestGrocery.name,
                   category: thirdTestGrocery.category,
                   date_added: thirdTestGrocery.date_added,
                   price: thirdTestGrocery.price,
                   checked: thirdTestGrocery.checked,
                 })
               })
           })
    })




  })
})


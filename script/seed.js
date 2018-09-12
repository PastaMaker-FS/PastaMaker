'use strict'

const db = require('../server/db')
const {
  User,
  Order,
  Product,
  Item,
  Type,
  Tag
} = require('../server/db/models')

const users = [
  {
  firstname: `Jelly`,
  lastname: `Fish`,
  email: `jelly@fish.com`,
  password: `123`,
  },
  {
  firstname: `Square`,
  lastname: `Brackets`,
  email: `sqr@braks.com`,
  password: `456`,
  },
  {
  firstname: `Dino`,
  lastname: `Sor`,
  email: `dino@sor.com`,
  password: `789`,
  },
]

const orders = [
  { datePurchased: Date.now(), userId: 1 },
  { datePurchased: Date.now(), userId: 1 },
  { datePurchased: Date.now(), userId: 2 },
  { datePurchased: Date.now(), userId: 3 },
  { datePurchased: Date.now(), userId: 3 },
  { datePurchased: Date.now(), userId: 3 },
]

const products = [
  {
  name: Bucatini,
  description: `description of Bucatini`,
  price: 1298,
  stock: 3000,
  imgUrl: https://www.fillmurray.com/300/400
  },
  {
  name: Scialatelli,
  description: `description of Scialatelli`,
  price: 2350,
  stock: 4000,
  imgUrl: https://www.fillmurray.com/300/500
  },
  {
  name: Tagliatelle,
  description: `description of Tagliatelle`,
  price: 1475,
  stock: 5000,
  imgUrl: https://www.fillmurray.com/300/600
  },
  {
  name: Mafalde,
  description: `description of Mafalde`,
  price: 1678,
  stock: 6000,
  imgUrl: https://www.fillmurray.com/300/700
  },
  {
  name: Spaghetti,
  description: `description of Spaghetti`,
  price: 1399,
  stock: 7000,
  imgUrl: https://www.fillmurray.com/300/800
  },
]

const types = [
  {name: long},
  {name: short},
  {name: stuffed},
]

const tags = [
  {name: tag1},
  {name: tag2},
  {name: tag3},
  {name: tag4},
  {name: tag5},
]

// const items = [
//   { orderId: 1, productId: 1},
//   { orderId: 1, productId: 2},
//   { orderId: 1, productId: 3},
//   { orderId: 1, productId: 4},
//   { orderId: 1, productId: 5},
//   { orderId: 2, productId: 1},
//   { orderId: 3, productId: 2},
//   { orderId: 3, productId: 3},
// ]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all( users.map(u => User.create(u)) )
  await Promise.all( orders.map(o => Product.create(o)) )
  await Promise.all( products.map(p => Product.create(p)) )
  // await Promise.all( items.map(i => Item.create(i)) )
  await Promise.all( types.map(t => Type.create(t)) )
  await Promise.all( tags.map(t => Tag.create(t)) )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

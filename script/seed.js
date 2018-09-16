'use strict'

const db = require('../server/db')
const {
  User,
  Address,
  Order,
  Product,
  Item,
  ProductType,
  ProductTag
} = require('../server/db/models')

const users = [
  {
  firstName: `Jelly`,
  lastName: `Fish`,
  email: `jelly@fish.com`,
  password: `123`,
  },
  {
  firstName: `Square`,
  lastName: `Brackets`,
  email: `sqr@braks.com`,
  password: `456`,
  },
  {
  firstName: `Dino`,
  lastName: `Sor`,
  email: `dino@sor.com`,
  password: `789`,
  },
]

const addresses = [
  {
  street: `40 Fairfield St.`,
  city: `Bayonne`,
  state: `NJ`,
  zip: '07002',
  userId: 1
  },
  {
  street: `69 Briarwood St.`,
  city: `Halethorpe`,
  state: `MD`,
  zip: '21227',
  userId: 2
  },
  {
  street: `2 Old Hartford Lane`,
  city: `Bethpage`,
  state: `NY`,
  zip: '11714',
  userId: 3
  }
]

const orders = [
  { datePurchased: Date.now(), userId: 1, isPurchased: false },
  { datePurchased: Date.now(), userId: 1, isPurchased: true },
  { datePurchased: Date.now(), userId: 2, isPurchased: true },
  { datePurchased: Date.now(), userId: 3, isPurchased: false },
  { datePurchased: Date.now(), userId: 3, isPurchased: true },
  { datePurchased: Date.now(), userId: 3, isPurchased: true },
]

const products = [
  {
  name: `Bucatini`,
  description: `This straw-like pasta is shaped like thick Spaghetti but is hollow in the center. Bucatini is the perfect choice for nearly any sauce, or it can be baked in casseroles or stirfried in dishes. Try it with different lean proteins and sauces for a change of pace.`,
  price: 1298,
  stock: 300,
  imgUrl: `https://i.imgur.com/Eku46Gj.png`
  },
  {
  name: `Scialatelli`,
  description: `The Scialatelli pasta is a type of thick and short fettuccine or linguine-like pasta featuring a rectangular cross section. This pasta has long been recognized as a PAT food in Campania meaning a Traditional Agri-food Product.`,
  price: 2350,
  stock: 400,
  imgUrl: `https://i.imgur.com/2dXuBmf.png`
  },
  {
  name: `Tagliatelle`,
  description: `The Tagliatelle pasta is long and ribbon-like in shape, very similar to the fettuccine. It can be served with an array of sauces but a classic meat sauce tends to be the way to go.`,
  price: 1475,
  stock: 500,
  imgUrl: `https://i.imgur.com/T8UFkRN.png`
  },
  {
  name: `Mafalde`,
  description: `This flat wide ribbon pasta is said to be similar in shape to the lasagne noodle but with a slightly narrower in size. The pasta come`,
  price: 1678,
  stock: 600,
  imgUrl: `https://i.imgur.com/LtcixHR.png`
  },
  {
  name: `Spaghetti`,
  description: `(“A length of cord”) America’s favorite shape, Spaghetti is the perfect choice for nearly any sauce, or it can be used to make casseroles or stir-fry dishes. Go beyond tomato sauce and see what your favorite becomes.`,
  price: 1399,
  stock: 700,
  imgUrl: `https://i.imgur.com/G47BV0I.png`
  },
]

const ProductTypes = [
  {name: `long`},
  {name: `short`},
  {name: `stuffed`},
]

const Producttags = [
  {name: `Producttag1`},
  {name: `Producttag2`},
  {name: `Producttag3`},
  {name: `Producttag4`},
  {name: `Producttag5`},
]

const items = [
  { orderId: 1, productId: 1},
  { orderId: 1, productId: 2},
  { orderId: 1, productId: 3},
  { orderId: 1, productId: 4},
  { orderId: 1, productId: 5},
  { orderId: 4, productId: 3},
  { orderId: 4, productId: 4},
  { orderId: 4, productId: 5},
  { orderId: 2, productId: 3, purchasePrice: 1223},
  { orderId: 2, productId: 4, purchasePrice: 1487},
  { orderId: 3, productId: 2, purchasePrice: 1550},
  { orderId: 3, productId: 3, purchasePrice: 925},
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all( users.map(u => User.create(u)) )
  await Promise.all( addresses.map(a => Address.create(a)) )
  await Promise.all( products.map(p => Product.create(p)) )
  await Promise.all( orders.map(o => Order.create(o)) )
  await Promise.all( items.map(i => Item.create(i)) )
  await Promise.all( ProductTypes.map(t => ProductType.create(t)) )
  await Promise.all( Producttags.map(t => ProductTag.create(t)) )


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

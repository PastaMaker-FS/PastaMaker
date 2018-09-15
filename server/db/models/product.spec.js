//UNFINISHED

const { expect } = require('chai');
const db = require('../index');
const Product = require('../models/product');

describe('Product Model', () => {
	beforeEach(() => {
		return db.sync({ force: true });
	});

	describe(' can Create Product', () => {
		describe(' Create Item.', () => {
			let product = {
				name: 'farfalle',
				description: 'Bow-Tie pasta',
				stock: 1000,
				price: 375,
				imgUrl: 'http://assets.stickpng.com/thumbs/589c827a64b351149f22a829.png'
			};

			beforeEach(async () => {
				let item = await Product.create(product);
			});

			it(' can save one item in the database', async () => {
				let response = await Product.findAll();
				expect(response.length).to.be.equal(1);
      });
    });

    describe(' Create Mupltiple Items.', () => {
      const products = [
        {
        name: `Bucatini`,
        description: `description of Bucatini`,
        price: 1298,
        stock: 300,
        imgUrl: `https://www.fillmurray.com/300/400`
        },
        {
        name: `Scialatelli`,
        description: `description of Scialatelli`,
        price: 2350,
        stock: 400,
        imgUrl: `https://www.fillmurray.com/300/500`
        },
        {
        name: `Tagliatelle`,
        description: `description of Tagliatelle`,
        price: 1475,
        stock: 500,
        imgUrl: `https://www.fillmurray.com/300/600`
        },
        {
        name: `Mafalde`,
        description: `description of Mafalde`,
        price: 1678,
        stock: 600,
        imgUrl: `https://www.fillmurray.com/300/700`
        },
        {
        name: `Spaghetti`,
        description: `description of Spaghetti`,
        price: 1399,
        stock: 700,
        imgUrl: `https://www.fillmurray.com/300/800`
        },
      ]

      beforeEach(async () => {
				let items = await Promise.all( products.map(p => Product.create(p)));
			});

			it(' can save one item in the database', async () => {
				let response = await Product.findAll();
				expect(response.length).to.be.equal(5);
      });
    });


  });

  describe(' can delete Product', () => {
    let item;
    describe(' Create Single Item then delete it.', () => {
      let product = {
				name: 'farfalle',
				description: 'Bow-Tie pasta',
				stock: 1000,
				price: 375,
				imgUrl: 'http://assets.stickpng.com/thumbs/589c827a64b351149f22a829.png'
      };

      beforeEach(async () => {
				item = await Product.create(product);
      });

      it(' can save one item in the database', async () => {
				let response = await Product.findAll();
				expect(response.length).to.be.equal(1);
      });

      it(' can delete one item in the database', async () => {
        let response = await item.destroy();
        expect(response.length).to.be.equal(0);
      })


    })
  })


});

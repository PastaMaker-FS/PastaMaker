/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SingleProduct from './singleProduct.js'
import ProductThumb from './productThumb'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Single Product View', () => {
  let product

  // beforeEach(() => {
  //   product = shallow(<SingleProduct name="product1" description="product description" stock="100" price="200" imgUrl="imgURL.jpg" />)
  // })

  const productObject = {
    name: "product1",
    description: "The Product Description",
    stock: 100,
    price: 375,
    imgUrl: "productURL.jpg"
  }

  it('renders the product name', () => {

    product = shallow(<SingleProduct product={productObject}/>)

    //console.log("The product is", product)

    expect(product.contains(<span className="productName"> Item: product1</span>)).to.equal(true);
  })
})

describe('Single Product Thumb', () => {
  let thumb

  it('renders a single product thumb', () => {
    thumb = shallow(<ProductThumb />)
    //console.log("The thumb is", thumb);
    expect(thumb.length).to.be.equal(1);
  })
})

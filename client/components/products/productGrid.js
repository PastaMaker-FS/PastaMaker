import React from 'react';
import SingleProduct from './singleProduct';
import ProductThumb from './productThumb';

function ProductGrid({ productArray, selectProduct, addToCart }) {
	//This component takes in three items on props
	//1: Array of Products as "productArray"
	//2: Click handler for select Product as "selectProduct"
	//3: Click handler for AddToCart as "addToCart"

	const enumeratedProducts = productArray.map((product) => (
    <div></div>
	));

	return <div>{enumeratedProducts}</div>;
}

export default ProductGrid;

import React from 'react';
import SingleProduct from './singleProduct';
import ProductThumb from './productThumb';

function ProductGrid({ productState, selectProduct, addToCart }) {



	const enumeratedProducts = productState.products.map((product) => (
		<ProductThumb key={product.id} product={product} selectProduct={selectProduct} addToCart={addToCart} />
	));

	return <div className="productGrid">{enumeratedProducts}</div>;
}

export default ProductGrid;

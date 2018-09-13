import React from 'react';


function ProductThumb({ productArray, selectProduct, addToCart }) {

	const enumeratedProducts = productArray.map((product) => (
    <div></div>
	));

	return <div>{enumeratedProducts}</div>;
}

export default ProductThumb;


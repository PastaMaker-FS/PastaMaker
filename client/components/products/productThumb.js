import React from 'react';


function ProductThumb({ product, addToCart, selectProduct, deselectProduct}) {

	return (<React.Fragment>
    <img className="img" src={product.imgUrl} width="125px" onClick={() => selectProduct(product)}/>
    <div>{product.name}</div>
    <div className="addToCart" onClick={() => addToCart(product)}> Add to cart</div>
  </React.Fragment>);
}

export default ProductThumb;


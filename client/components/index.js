/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

export { default as Navbar } from './navbar';
export { default as UserHome } from './user-home';
export { default as Cart } from './orders/cart';
export { default as CartView } from './orders/cart-view';
export { default as Item } from './orders/item';
export { default as ItemView } from './orders/item-view';
export { default as OrderHistory } from './orders/order-history';
export { default as OrderView } from './orders/order-view';
export { default as CheckoutWrapper } from './checkout/checkoutWrapper';
export { default as Home } from './home';
export { Login, Signup } from './auth-form';
export { default as AllProducts } from './products/allProducts';
export { default as ProductGrid } from './products/productGrid';
export { default as ProductThumb } from './products/productThumb';
export { default as SingleProduct } from './products/singleProduct';

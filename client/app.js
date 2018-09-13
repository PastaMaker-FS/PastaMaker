import React from 'react';

import { Navbar } from './components';
import AllProducts from './components/allProducts';
import Routes from './routes';

const App = () => {
	return (
		<div>
			<Navbar />
			<AllProducts />
			<Routes />
		</div>
	);
};

export default App;

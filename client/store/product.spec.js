import { expect } from 'chai';
import { getProductTHUNK, getProductsByTagsTHUNK, getProductsByTypesTHUNK } from './product';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../history';

const middlewares = [ thunkMiddleware ];
const mockStore = configureMockStore(middlewares);

describe('Product thunk creators', () => {
	let store;
	let mockAxios;

	const initialState = {
		product: {},
		products: [],
		loadStatus: {
			productLoading: false,
			productLoadErr: false,
			productLoaded: false,
			productTagLoading: false,
			productTagLoaded: false,
			productTagErr: false,
			productTypeLoading: false,
			productTypeLoaded: false,
			productTypeErr: false
		}
	};

	beforeEach(() => {
		mockAxios = new MockAdapter(axios);
		store = mockStore(initialState);
	});

	afterEach(() => {
		mockAxios.restore();
		store.clearActions();
	});

	describe('Get all Products', () => {
		it('eventually disptaches the GET_ALL_PRODUCT action', async () => {
			let fakeProducts = [ { id: 1, name: 'Product1' }, { id: 2, name: 'Product2' } ];

			mockAxios.onGet('/api/products').replyOnce(200, fakeProducts);
			await store.dispatch(getProductTHUNK());
			const actions = store.getActions();
			expect(actions[0].type).to.be.equal('GET_ALL_PRODUCT');
			expect(actions[0].products).to.be.deep.equal(fakeProducts);
		});
	});

	describe('Get Product by Tag', () => {
		it('eventaully dispatched the GET_PRODUCTS_BY_TAG thunk', async () => {
			let fakeProducts = [ { id: 1, name: 'Product1', tags: 'tag1' }, { id: 2, name: 'Product2', tags: 'tag2' } ];
			let tag = 'tag1';

			mockAxios.onGet(`/api/products/tag/${tag}`).replyOnce(200, fakeProducts[0]);
			await store.dispatch(getProductsByTagsTHUNK(tag));
			const actions = store.getActions();
			expect(actions[0].type).to.be.equal('GET_PRODUCTS_BY_TAG');
			expect(actions[0].productsByTag.data).to.be.deep.equal(fakeProducts[0]);
		});
  });


  describe('Get PRoduct by Type', () => {
    it('eventually dispatch the GET_PRODUCTS_BY_TYPE thunk', async () => {
      let fakeProducts = [ { id: 1, name: 'Product1', tags: 'tag1', type: 'type1' }, { id: 2, name: 'Product2',  tags: 'tag2', type: 'type2' } ];
			let type = 'type1';

      mockAxios.onGet(`/api/products/type/${type}`).replyOnce(200, fakeProducts[0]);
      await store.dispatch(getProductsByTypesTHUNK(type));
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal('GET_PRODUCTS_BY_TYPE');
      expect(actions[0].productsByType.data).to.be.deep.equal(fakeProducts[0]);
  })})

});

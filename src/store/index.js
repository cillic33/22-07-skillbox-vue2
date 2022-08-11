import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cartProducts: [
      {productId: 1, amount: 1},
      {productId: 3, amount: 2}
    ]
  },
  mutations: {
    addProductToCart(state, {productId, amount}) {
      const item = state.cartProducts.find(p => p.productId === productId);
      if (item) {
        item.amount += amount;
      } else {
        state.cartProducts.push({productId, amount});
      }
    },
    delProductFromCart(state, productId) {
      const item = state.cartProducts.find(p => p.productId === productId);
      if (item) {
        state.cartProducts = state.cartProducts.filter(p => p.productId !== productId);
      }
    },
    updateCartProductAmount(state, {productId, amount}) {
      const item = state.cartProducts.find(p => p.productId === productId);
      if (item) {
        item.amount = amount;
      }
    }
  },
  getters: {
    cartProducts(state) {
      return state.cartProducts.map(item => {
        return {
          ...item,
          product: products.find(p => p.id === item.productId)
        }
      })
    },
    cartProductsAmountPrice(state, getters) {
      return getters.cartProducts.reduce((acc, item) => acc + (item.product.price * item.amount), 0);
    }
  }
});

export default store;

import Vue from 'vue';
import Vuex from 'vuex';
import { API_BASE_URL } from '@/config';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cartProducts: [],

    userAccessKey: null,
    cartProductsData: null,
    isCartProductsLoading: false,
    isCartProductsLoadingFail: false,

    isCartProductAdding: false,
    isCartProductAddingFail: false,
    isCartProductAddingSuccess: false,

    isCartProductAmountUpdating: false,
    isCartProductAmountUpdatingFail: false,

    isCartProductDeleting: false,
    isCartProductDeletingFail: false,

    editingProductId: null,
  },
  mutations: {
    updateCartProductAmount(state, {productId, amount}) {
      const product = state.cartProducts.find(p => p.productId === productId);
      product.amount = amount;
    },
    updateUserAccessKey(state, key) {
      state.userAccessKey = key;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map(item => {
        return {
          productId: item.product.id,
          amount: item.quantity,
        };
      });
    },

    resetIsCartProductAddingFail(state) {
      state.isCartProductAddingFail = false;
    },
    resetIsCartProductAddingSuccess(state) {
      state.isCartProductAddingSuccess = false;
    },
    resetIsCartProductAmountUpdatingFail(state) {
      state.isCartProductAmountUpdatingFail = false;
    },
  },
  getters: {
    cartProducts(state) {
      return state.cartProducts.map(item => {
        const product = state.cartProductsData.find(p => p.product.id === item.productId).product;

        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url
          }
        };
      });
    },
    cartProductsCount(state) {
      return state.cartProducts.length;
    },
    cartProductsAmountPrice(state, getters) {
      return getters.cartProducts.reduce((acc, item) => acc + (item.product.price * item.amount), 0);
    },

    isCartProductsLoading(state) {
      return state.isCartProductsLoading;
    },
    isCartProductsLoadingFail(state) {
      return state.isCartProductsLoadingFail;
    },

    isCartProductAdding(state) {
      return state.isCartProductAdding;
    },
    isCartProductAddingFail(state) {
      return state.isCartProductAddingFail;
    },
    isCartProductAddingSuccess(state) {
      return state.isCartProductAddingSuccess;
    },

    isCartProductAmountUpdating(state) {
      return state.isCartProductAmountUpdating;
    },
    isCartProductAmountUpdatingFail(state) {
      return state.isCartProductAmountUpdatingFail;
    },

    isCartProductDeleting(state) {
      return state.isCartProductDeleting;
    },
    isCartProductDeletingFail(state) {
      return state.isCartProductDeletingFail;
    },

    editingProductId(state) {
      return state.editingProductId;
    }
  },
  actions: {
    loadCartProductsData(context) {
      context.state.isCartProductsLoading = true;
      context.state.isCartProductsLoadingFail = false;

      setTimeout(() => {
        return axios
          .get(API_BASE_URL + '/api/baskets', {
            params: {
              userAccessKey: context.state.userAccessKey,
            }
          })
          .then(response => {
            if (context.state.userAccessKey === null) {
              context.commit('updateUserAccessKey', response.data.user.accessKey);
              localStorage.setItem('accessKey', response.data.user.accessKey);
            }
            context.commit('updateCartProductsData', response.data.items);
            context.commit('syncCartProducts');
          })
          .catch(error => {
            context.state.isCartProductsLoadingFail = true;
            console.log(error);
          })
          .then(() => {
            context.state.isCartProductsLoading = false;
          });
      }, 1000);
    },
    addProductToCart(context, {productId, quantity}) {
      context.state.isCartProductAdding = true;
      context.state.isCartProductAddingFail = false;
      context.state.isCartProductAddingSuccess = false;

      setTimeout(() => {
        return axios
          .post(API_BASE_URL + '/api/baskets/products', {
            productId,
            quantity,
          }, {
            params: {
              userAccessKey: context.state.userAccessKey,
            }
          })
          .then(response => {
            context.commit('updateCartProductsData', response.data.items);
            context.commit('syncCartProducts');
          })
          .catch(error => {
            context.state.isCartProductAddingFail = true;
            console.log(error);
          })
          .then(() => {
            context.state.isCartProductAdding = false;
            context.state.isCartProductAddingSuccess = (!context.state.isCartProductAddingFail);
          });
      }, 1000);
    },
    updateCartProductAmount(context, {productId, amount}) {
      context.commit('updateCartProductAmount', {productId, amount});

      if (amount < 1) {
        return;
      }

      context.state.isCartProductAmountUpdating = true;
      context.state.isCartProductAmountUpdatingFail = false;
      context.state.editingProductId = productId;

      setTimeout(() => {
        return axios
          .put(API_BASE_URL + '/api/baskets/products', {
            productId: productId,
            quantity: amount,
          }, {
            params: {
              userAccessKey: context.state.userAccessKey,
            }
          })
          .then(response => {
            context.commit('updateCartProductsData', response.data.items);
          })
          .catch(error => {
            context.commit('syncCartProducts');
            context.state.isCartProductAmountUpdatingFail = true;
            console.log(error);
          })
          .then(() => {
            context.state.isCartProductAmountUpdating = false;
          });
      }, 1000);
    },
    deleteCartProduct(context, productId) {
      context.state.isCartProductDeleting = true;
      context.state.isCartProductDeletingFail = false;
      context.state.editingProductId = productId;

      setTimeout(() => {
        return axios
          .delete(API_BASE_URL + '/api/baskets/products', {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
            data: {
              productId: productId
            }
          })
          .then(response => {
            context.commit('updateCartProductsData', response.data.items);
            context.commit('syncCartProducts');
          })
          .catch(error => {
            context.state.isCartProductDeletingFail = true;
            console.log(error);
          })
          .then(() => context.state.isCartProductDeleting = false);
      }, 1000);
    },
  }
});

export default store;

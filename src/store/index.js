import Vue from 'vue';
import Vuex from 'vuex';
import { API_BASE_URL } from '@/config';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    cartProducts: [],

    userAccessKey: null,
    cartProductsData: [],
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

    orderInfo: {},
    isOrderInfoLoading: false,
    isOrderInfoLoadingFail: false,
    orderInfoLoadingFail: '',
  },
  mutations: {
    updateOrderInfo(state, payload) {
      state.orderInfo = payload;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, {
      productId,
      amount
    }) {
      const product = state.cartProducts.find(p => p.productId === productId);
      product.amount = amount;
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter(p => p.productId !== productId);
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
    },

    orderInfo(state) {
      return state.orderInfo ? state.orderInfo : {};
    },
    isOrderInfoLoading(state) {
      return state.isOrderInfoLoading;
    },
    isOrderInfoLoadingFail(state) {
      return state.isOrderInfoLoadingFail;
    },
    orderInfoLoadingFail(state) {
      return state.orderInfoLoadingFail;
    },
  },
  actions: {
    loadCartProductsData(context) {
      context.state.isCartProductsLoading = true;
      context.state.isCartProductsLoadingFail = false;

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
        .finally(() => {
          context.state.isCartProductsLoading = false;
        });
    },
    addProductToCart(context, {
      productId,
      quantity
    }) {
      context.state.isCartProductAdding = true;
      context.state.isCartProductAddingFail = false;
      context.state.isCartProductAddingSuccess = false;

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
        .finally(() => {
          context.state.isCartProductAdding = false;
          context.state.isCartProductAddingSuccess = (!context.state.isCartProductAddingFail);
        });
    },
    updateCartProductAmount(context, {
      productId,
      amount
    }) {
      context.commit('updateCartProductAmount', {
        productId,
        amount
      });

      if (amount < 1) {
        return;
      }

      context.state.isCartProductAmountUpdating = true;
      context.state.isCartProductAmountUpdatingFail = false;
      context.state.editingProductId = productId;

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
        .finally(() => {
          context.state.isCartProductAmountUpdating = false;
        });
    },
    deleteCartProduct(context, productId) {
      context.commit('deleteCartProduct', productId);

      context.state.isCartProductDeleting = true;
      context.state.isCartProductDeletingFail = false;
      context.state.editingProductId = productId;

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
        })
        .catch(error => {
          context.commit('syncCartProducts');
          context.state.isCartProductDeletingFail = true;
          console.log(error);
        })
        .finally(() => context.state.isCartProductDeleting = false);
    },
    loadOrderInfo(context, orderId) {
      context.state.isOrderInfoLoading = true;
      context.state.isOrderInfoLoadingFail = false;
      context.state.orderInfoLoadingFail = '';

      return axios
        .get(API_BASE_URL + '/api/orders/' + orderId, {
          params: {
            userAccessKey: context.state.userAccessKey,
          }
        })
        .then(response => {
          context.commit('updateOrderInfo', response.data);
        })
        .catch(error => {
          context.state.isOrderInfoLoadingFail = true;
          context.state.orderInfoLoadingFail = error.response.data.error.message;
        })
        .finally(() => {
          context.state.isOrderInfoLoading = false;
        });
    },
  }
});

export default store;

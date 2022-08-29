<template>
  <router-link class="header__cart" aria-label="Корзина с товарами" :to="{name: 'cart'}">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span v-if="isCartProductsLoading || isCartProductAdding || isCartProductAmountUpdating || isCartProductDeleting" class="header__count">
      <span class="loader loader__cart-indicator"></span>
    </span>
    <span v-else class="header__count" aria-label="Количество товаров">
      {{ cartProductsCount }}
    </span>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isCartProductsLoading', 'cartProductsCount', 'isCartProductAdding', 'isCartProductAmountUpdating', 'isCartProductDeleting']),
  }
};
</script>

<style scoped lang="stylus">

</style>

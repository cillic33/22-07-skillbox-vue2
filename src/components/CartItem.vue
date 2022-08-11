<template>
  <li class="cart__item product">
    <router-link class="product__pic" :to="{name: 'product', params: {id: item.productId}}">
      <img :src="item.product.image" width="120" height="120" :alt="item.product.title">
    </router-link>
    <h3 class="product__title">
      <router-link :to="{name: 'product', params: {id: item.productId}}">
        {{ item.product.title }}
      </router-link>
    </h3>
    <span class="product__code">
      Артикул: {{ item.productId }}
    </span>

    <SetAmount v-model.number="amount" />

    <b class="product__price">
      {{ item.product.price | numberFormat }} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click.prevent="delItem(item.productId)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { mapMutations } from 'vuex';
import numberFormat from '@/helpers/numderFormat';
import SetAmount from '@/components/SetAmount';

export default {
  props: ['item'],
  components: {SetAmount},
  filters: {numberFormat},
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.commit('updateCartProductAmount', {productId: this.item.productId, amount: value});
      }
    }
  },
  methods: {
    ...mapMutations({delItem: 'delProductFromCart'}),
  }
};
</script>

<style scoped lang="stylus">
button
  cursor pointer
</style>

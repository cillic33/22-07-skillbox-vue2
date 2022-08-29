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

    <div class="cart__item__set-amount__wrap">
      <div v-if="isCartProductAmountUpdating && editingProductId === item.productId" class="cart__item__set-amount__spinner">
        <span class="loader loader__cart-item"></span>
      </div>
      <SetAmount v-model.number="amount"/>
    </div>

    <b class="product__price">
      {{ item.product.price | numberFormat }} ₽
    </b>

    <div v-if="isCartProductDeleting && editingProductId === item.productId">
      <span class="loader loader__cart-item"></span>
    </div>
    <button v-else class="product__del button-del" type="button"
            aria-label="Удалить товар из корзины" @click.prevent="deleteItem">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>

    <span class="loader"></span>

  </li>
</template>

<script>
import numberFormat from '@/helpers/numderFormat';
import SetAmount from '@/components/SetAmount';
import { mapActions, mapGetters } from 'vuex';

export default {
  props: ['item'],
  components: { SetAmount },
  filters: { numberFormat },
  computed: {
    ...mapGetters(['isCartProductAmountUpdating', 'isCartProductDeleting', 'editingProductId']),

    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.updateCartProductAmount({
          productId: this.item.productId,
          amount: value
        });
      }
    }
  },
  methods: {
    ...mapActions(['updateCartProductAmount', 'deleteCartProduct']),

    deleteItem() {
      this.deleteCartProduct(this.item.productId);
    }
  }
};
</script>

<style scoped lang="stylus">
button
  cursor pointer

.cart__item__set-amount
  &__spinner
    position absolute
    display flex
    align-items center
    justify-content center
    width 120px
    height 50px
    background #eeeeeeee
</style>

<template>
  <div>

    <router-link class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src="product.image" :alt="product.title">
    </router-link>

    <h3 class="catalog__title">
      <router-link :to="{name: 'product', params: {id: product.id}}">
        {{ product.title }}
      </router-link>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>

    <ProductColors :product="product"/>

  </div>
</template>

<script>
import numberFormat from '@/helpers/numderFormat';
import ProductColors from '@/components/ProductColors';

export default {
  props: ['product'],
  components: { ProductColors },
  filters: {
    numberFormat,
  }
};
</script>

<style lang="stylus" scoped>
.catalog
  &__pic
    display flex
    align-items center
    justify-content center
    width 100%

    img
      width auto
      height auto
      max-width 260px !important
      max-height 290px !important

</style>

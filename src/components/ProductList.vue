<template>
  <ul class="catalog__list">

    <li class="catalog__item" v-for="product in products" :key="product.id">
      <ProductItem :product="product"></ProductItem>
    </li>

  </ul>
</template>

<script>
import ProductItem from '@/components/ProductItem';

export default {
  props: ['products'],
  components: {ProductItem}
};
</script>

<style lang="stylus">
.catalog
  &__item
    border 1px solid #eee
    padding 6px
    border-radius 6px
</style>

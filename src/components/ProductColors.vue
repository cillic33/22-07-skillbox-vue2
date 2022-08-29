<template>
  <ul class="colors">
    <ProductColor v-for="color in product.colors" :key="color.id" :color="color" :id="product.id"/>
  </ul>
</template>

<script>
import ProductColor from '@/components/ProductColor';

export default {
  props: ['product'],
  components: { ProductColor }
};
</script>

<style scoped lang="stylus">

</style>

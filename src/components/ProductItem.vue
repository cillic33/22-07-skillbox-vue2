<template>
  <div>
    <a class="catalog__pic" href="#" @click.prevent="gotoPage('product', {id: product.id})">
      <img :src="product.image" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" v-model="currentColorId" :value="colors[color].id">
          <span class="colors__value" :style="{backgroundColor: colors[color].value}"></span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import colors from '@/data/colors';
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numderFormat';

export default {
  props: ['product'],
  data() {
    return {
      colors,
      currentColorId: 0,
    }
  },
  filters: {
    numberFormat,
  },
  methods: {
    gotoPage,
  }
};
</script>

<style lang="stylus" scoped>
.colors
  &__value
    border 1px solid #626262
</style>

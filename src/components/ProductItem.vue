<template>
  <div>
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price }} ₽
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

export default {
  props: ['product'],
  data() {
    return {
      colors,
      currentColorId: 0,
    }
  }
};
</script>

<style lang="stylus" scoped>
.colors
  &__value
    border 1px solid #626262
</style>

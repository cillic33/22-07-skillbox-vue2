<template>
  <li class="colors__item">
    <label class="colors__label">
      <input class="colors__radio sr-only" type="radio" v-model="color.id" :name="id">
      <span class="colors__value" :style="{backgroundColor: color.code}"></span>
    </label>
  </li>
</template>

<script>
export default {
  props: ['id', 'color']
};
</script>

<style scoped lang="stylus">
.colors
  &__label
    > input:checked
      ~ .colors__value
        &:before
          border 1px solid #888

  &__value
    border 1px solid #888
</style>

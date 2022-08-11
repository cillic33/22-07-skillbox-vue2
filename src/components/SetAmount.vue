<template>
  <div class="product__counter form__counter">
    <button type="button" aria-label="Убрать один товар" @click="computedAmount--" :disabled="amount === 1">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" id="productAmountInput" v-model="computedAmount">

    <button type="button" aria-label="Добавить один товар" @click="computedAmount++">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'amount',
    event: 'change-amount'
  },
  props: ['amount'],
  computed: {
    computedAmount: {
      get() {
        return this.amount;
      },
      set(val) {
        this.$emit('change-amount', val);
      }
    }
  }
};
</script>

<style scoped lang="stylus">
  button
    cursor pointer
</style>

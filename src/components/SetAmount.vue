<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click="decAmount" :disabled="amount === 1">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" id="productAmountInput" v-model="amount">

    <button type="button" aria-label="Добавить один товар" @click="incAmount">
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
  methods: {
    decAmount() {
      if (this.amount > 1) { this.amount--; }
    },
    incAmount() {
      this.amount++
    }
  },
  watch: {
    amount(value) {
      this.$emit('change-amount', value);
    }
  }
};
</script>

<style scoped lang="stylus">
  button
    cursor pointer
</style>

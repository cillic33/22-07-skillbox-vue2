<template>
  <header class="header">
    <div class="header__wrapper container">
      <router-link class="header__info" :to="{name: 'main'}">Каталог</router-link>

      <router-link class="header__logo" :to="{name: 'main'}">
        <img src="img/svg/logo-tech.svg" alt="Логотип интернет магазина Технозавррр" width="190" height="33">
      </router-link>

      <a class="header__tel" href="tel:8 800 600 90 09">
        8 800 600 90 09
      </a>

      <router-link class="header__cart" aria-label="Корзина с товарами" :to="{name: 'cart'}">
        <svg width="30" height="21" fill="currentColor">
          <use xlink:href="#icon-cart"></use>
        </svg>
        <span class="header__count" aria-label="Количество товаров">{{ $store.state.cartProducts.length }}</span>
      </router-link>
    </div>
  </header>
</template>

<script>

export default {

};
</script>

<style scoped>

</style>

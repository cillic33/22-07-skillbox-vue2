<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ orderInfo.id || '-'}}</span>
      </h1>
    </div>

    <transition name="items-fade" mode="out-in">

      <div v-if="isOrderInfoLoadingFail" key="isOrderInfoLoadingFail">
        <p class="message__error">
          {{ orderInfoLoadingFail }}
        </p>
      </div>

      <PreloaderBall v-else-if="isOrderInfoLoading"
                     message="Данные о заказе загружаются..."></PreloaderBall>

      <section v-else class="cart" key="orderInfoContent">
        <form class="cart__form form" action="#" method="POST">
          <div class="cart__field">
            <p class="cart__message">
              Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями
              заказа.
              Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей
              доставки.
            </p>

            <ul class="dictionary">
              <li class="dictionary__item">
                <span class="dictionary__key">
                  Получатель
                </span>
                <span class="dictionary__value">
                  {{ orderInfo.name }}
                </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key">
                  Адрес доставки
                </span>
                <span class="dictionary__value">
                  {{ orderInfo.address }}
                </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key">
                  Телефон
                </span>
                <span class="dictionary__value">
                  {{ orderInfo.phone }}
                </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key">
                  Email
                </span>
                <span class="dictionary__value">
                  {{ orderInfo.email }}
                </span>
              </li>
              <li class="dictionary__item">
                <span class="dictionary__key">
                  Способ оплаты
                </span>
                <span class="dictionary__value">
                  картой при получении
                </span>
              </li>
            </ul>
          </div>

          <div class="cart__block">
            <ul class="cart__orders">
              <li class="cart__order" v-for="product in orderInfo.basket.items" :key="product.id">
                <h3>{{ product.product.title }}</h3>
                <b>{{ product.product.price | numberFormat }} ₽</b>
                <span>Артикул: {{ product.id }}</span>
              </li>
            </ul>

            <div class="cart__total">
              <!--<p>Доставка: <b>500 ₽</b></p>-->
              <p>Итого: <b>{{ orderInfo.basket.items.length }}</b> товара на сумму
                <b>{{ orderInfo.totalPrice | numberFormat }} ₽</b></p>
            </div>
          </div>
        </form>
      </section>

    </transition>

  </main>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import numberFormat from '@/helpers/numderFormat';
import PreloaderBall from '@/components/PreloaderBall';

export default {
  components: {
    PreloaderBall
  },
  computed: {
    ...mapGetters(['orderInfo', 'isOrderInfoLoading', 'isOrderInfoLoadingFail', 'orderInfoLoadingFail']),
  },
  methods: {
    ...mapActions(['loadOrderInfo']),
    ...mapMutations(['updateOrderInfo', 'resetIsOrderInfoLoadingFail'])
  },
  filters: {
    numberFormat
  },
  watch: {
    '$route.params.id'() {
      this.loadOrderInfo(this.$route.params.id);
    }
  },
  created() {
    if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) {
      return;
    }
    this.loadOrderInfo(this.$route.params.id);
  },
  destroyed() {
    this.resetIsOrderInfoLoadingFail();
  }
};
</script>

<style scoped lang="stylus">

</style>

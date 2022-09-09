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
        Корзина
      </h1>
      <span class="content__info">
        Товаров в корзине: {{ cartProductsCount }}
      </span>
    </div>

    <transition name="items-fade" mode="out-in">

      <PreloaderBall v-if="isSendingOrder" message="Данные загружаются..."></PreloaderBall>

      <section v-else class="cart" key="sendOrderContent">
        <form class="cart__form form" action="#" method="POST" @submit.prevent="sendOrder">
          <div class="cart__field">
            <div class="cart__data">
              <BaseFormText title="ФИО" :error="ErrorData.name" placeholder="Введите ваше имя"
                            v-model="OrderData.name"></BaseFormText>
              <BaseFormText title="Адрес доставки" :error="ErrorData.address"
                            placeholder="Введите ваш адрес"
                            v-model="OrderData.address"></BaseFormText>
              <BaseFormText title="Телефон" :error="ErrorData.phone"
                            placeholder="Введите ваш телефон"
                            v-model="OrderData.phone" type="phone"></BaseFormText>
              <BaseFormText title="Email" :error="ErrorData.email" placeholder="Введи ваш Email"
                            v-model="OrderData.email" type="email"></BaseFormText>
              <BaseFormTextarea title="Комментарий к заказу" :error="ErrorData.comment"
                                placeholder="Ваши пожелания"
                                v-model="OrderData.comment"></BaseFormTextarea>
            </div>

            <div class="cart__options">
              <h3 class="cart__title">Доставка</h3>
              <ul class="cart__options options">
                <li class="options__item">
                  <label class="options__label">
                    <input class="options__radio sr-only" type="radio" name="delivery" value="0"
                           checked="">
                    <span class="options__value">
                  Самовывоз <b>бесплатно</b>
                </span>
                  </label>
                </li>
                <li class="options__item">
                  <label class="options__label">
                    <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                    <span class="options__value">
                  Курьером <b>500 ₽</b>
                </span>
                  </label>
                </li>
              </ul>

              <h3 class="cart__title">Оплата</h3>
              <ul class="cart__options options">
                <li class="options__item">
                  <label class="options__label">
                    <input class="options__radio sr-only" type="radio" name="pay" value="card">
                    <span class="options__value">
                  Картой при получении
                </span>
                  </label>
                </li>
                <li class="options__item">
                  <label class="options__label">
                    <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                    <span class="options__value">
                  Наличными при получении
                </span>
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <div class="cart__block">
            <ul class="cart__orders">
              <li class="cart__order" v-for="product in cartProducts" :key="product.productId">
                <h3>{{ product.product.title }}</h3>
                <b>{{ product.product.price |  numberFormat }} ₽</b>
                <span>Артикул: {{ product.productId }}</span>
              </li>
            </ul>

            <div class="cart__total">
              <!--<p>Доставка: <b>500 ₽</b></p>-->
              <p>Итого: <b>{{ cartProductsCount }}</b> товара на сумму
                <b>{{ cartProductsAmountPrice | numberFormat }} ₽</b></p>
            </div>

            <button class="cart__button button button--primery" type="submit">
              Оформить заказ
            </button>
          </div>
          <div class="cart__error form__error-block" v-if="ErrorMessage">
            <h4>Заявка не отправлена!</h4>
            <p>
              {{ ErrorMessage }}
            </p>
          </div>
        </form>
      </section>

    </transition>

  </main>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numderFormat';
import BaseFormText from '@/components/BaseFormText';
import BaseFormTextarea from '@/components/BaseFormTextarea';
import PreloaderBall from '@/components/PreloaderBall';

export default {
  data() {
    return {
      OrderData: {},
      ErrorData: {},
      ErrorMessage: '',
      isSendingOrder: false,
    };
  },
  components: {
    BaseFormText,
    BaseFormTextarea,
    PreloaderBall
  },
  filters: { numberFormat },
  computed: {
    ...mapGetters(['cartProductsCount', 'cartProducts', 'cartProductsAmountPrice']),
  },
  methods: {
    sendOrder() {
      this.ErrorData = {};
      this.ErrorMessage = '';
      this.isSendingOrder = true;

      return axios
        .post(API_BASE_URL + '/api/orders', {
          ...this.OrderData
        }, {
          params: {
            userAccessKey: this.$store.state.userAccessKey
          }
        })
        .then(response => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({
            name: 'orderInfo',
            params: { id: response.data.id }
          });
        })
        .catch(error => {
          this.ErrorData = error.response.data.error.request || {};
          this.ErrorMessage = error.response.data.error.message;
        })
        .finally(() => {
          this.isSendingOrder = false;
        });

    }
  },
};
</script>

<style scoped lang="stylus">

</style>

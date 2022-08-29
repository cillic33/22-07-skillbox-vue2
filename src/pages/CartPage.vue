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
      </ul>
      <h1 class="content__title">
        Корзина
      </h1>
    </div>

    <section class="cart">
      <transition name="items-fade" mode="out-in">

        <!-- Preloader -->
        <div v-if="isCartProductsLoading" class="cart__preloader" :key="'isCartProductsLoading'">
          <div class="contener_general">
            <div class="contener_mixte">
              <div class="ballcolor ball_1">&nbsp;</div>
            </div>
            <div class="contener_mixte">
              <div class="ballcolor ball_2">&nbsp;</div>
            </div>
            <div class="contener_mixte">
              <div class="ballcolor ball_3">&nbsp;</div>
            </div>
            <div class="contener_mixte">
              <div class="ballcolor ball_4">&nbsp;</div>
            </div>
          </div>
          <div>Корзина загружается...</div>
        </div>

        <!-- Ошибка загрузки товаров -->
        <div v-else-if="isCartProductsLoadingFail" class="message__error"
             :key="'isCartProductsLoadingFail'">
          Произошла ошибка загрузки товаров
        </div>

        <!-- Основной контент корзины -->
        <div v-else :key="'cartProductsContent'">
          <span class="content__info">
            {{ cartProductsCount }} товара<br><br>
          </span>

          <form class="cart__form form" action="#" method="POST">

            <!-- Список товаров -->
            <div class="cart__field">
              <ul class="cart__list">
                <div v-if="isCartProductAmountUpdatingFail" class="message__error">
                  Произошла ошибка изменения количества товара в корзине. Попробуйте еще раз.<br>
                  Количество должно быть целым положительным числом.<br><br>
                </div>
                <div v-if="isCartProductDeletingFail" class="message__error">
                  Произошла ошибка удаления товара из корзины. Попробуйте еще раз.<br><br>
                </div>
                <div v-if="cartProductsCount === 0">
                  Корзина пуста<br><br>
                  <router-link :to="{name: 'main'}" tag="button" class="btn">Перейти в каталог</router-link>
                </div>
                <CartItem v-for="item in cartProducts" :key="item.productId" :item="item"/>
              </ul>
            </div>

            <!-- Общая стоимость и кнопка Оформить -->
            <div class="cart__block">
              <p class="cart__desc">
                Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
              </p>

              <div v-if="isCartProductAmountUpdating || isCartProductDeleting" class="loader__cart-order-wrap">
                <div class="loader loader__cart-order"></div>
              </div>

              <div v-else>
                <p class="cart__price">
                  Итого: <span>{{ cartProductsAmountPrice | numberFormat }} ₽</span>
                </p>
                <button class="cart__button button button--primery" type="submit">
                  Оформить заказ
                </button>
              </div>

            </div>

          </form>
        </div>

      </transition>
    </section>

  </main>
</template>

<script>
import numberFormat from '@/helpers/numderFormat';
import CartItem from '@/components/CartItem';
import { mapGetters, mapMutations } from 'vuex';

export default {
  filters: { numberFormat },
  components: { CartItem },
  computed: {
    ...mapGetters(['cartProducts', 'cartProductsCount', 'cartProductsAmountPrice', 'isCartProductsLoading', 'isCartProductsLoadingFail', 'isCartProductAmountUpdating', 'isCartProductAmountUpdatingFail', 'isCartProductDeleting', 'isCartProductDeletingFail'])
  },
  methods: {
    ...mapMutations(['resetIsCartProductAmountUpdatingFail']),
  },
  created() {
    this.resetIsCartProductAmountUpdatingFail();
  }
};
</script>

<style scoped lang="stylus">
.cart
  &__preloader
    display flex
    align-items center
    flex-direction column
    gap 20px

.loader__cart-order-wrap
  text-align center
</style>

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
        <PreloaderBall v-if="isCartProductsLoading"
                       message="Корзина загружается..."></PreloaderBall>

        <!-- Ошибка загрузки товаров -->
        <div v-else-if="isCartProductsLoadingFail" class="message__error"
             key="isCartProductsLoadingFail">
          Произошла ошибка загрузки товаров
        </div>

        <!-- Основной контент корзины -->
        <div v-else key="cartProductsContent">
          <span class="content__info">
            Товаров: {{ cartProductsCount }}<br><br>
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
                  <router-link :to="{name: 'main'}" tag="button" class="btn">Перейти в каталог
                  </router-link>
                </div>
                <CartItem v-for="item in cartProducts" :key="item.productId" :item="item"/>
              </ul>
            </div>

            <!-- Общая стоимость и кнопка Оформить -->
            <div class="cart__block">
              <p class="cart__desc">
                Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
              </p>

              <div>
                <p class="cart__price">
                  Итого:
                  <span v-if="isCartProductAmountUpdating || isCartProductDeleting"
                        class="loader loader__cart-order"></span>
                  <span v-else>{{ cartProductsAmountPrice | numberFormat }} ₽</span>
                </p>
                <router-link tag="button" :to="{name: 'order'}"
                             class="cart__button button button--primery" type="submit"
                             :disabled="isCartProductAmountUpdating || isCartProductDeleting"
                             v-if="cartProductsCount">
                  Оформить заказ
                </router-link>
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
import PreloaderBall from '@/components/PreloaderBall';

export default {
  filters: { numberFormat },
  components: {
    CartItem,
    PreloaderBall
  },
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

  &__price
    height 50px
</style>

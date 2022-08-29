<template>

  <div>
    <BaseHeader/>
    <router-view class="router__container"/>
    <BaseFooter/>
  </div>

</template>

<script>
import BaseHeader from '@/components/BaseHeader';
import BaseFooter from '@/components/BaseFooter';
import { mapMutations, mapActions } from 'vuex';

export default {
  components: {BaseHeader, BaseFooter},
  methods: {
    ...mapMutations(['updateUserAccessKey']),
    ...mapActions(['loadCartProductsData']),
  },
  created() {
    const accessKey = localStorage.getItem('accessKey');
    if (accessKey) {
      this.updateUserAccessKey(accessKey);
    }
    this.loadCartProductsData();
  }
}
</script>

<style lang="stylus">
.router
  &__container
    min-height: calc(100vh - 406px)

.message__error
  color #d31717
  font-size 14px

.btn
  font-family "PressStart"
  font-size 9px
  background #9eff00
  border 1px solid #9eff00
  color #000
  padding 10px 16px
  cursor pointer
  text-transform uppercase

  &:hover
    background #fff


/* Используется для анимации переходов */
.items-fade
  &-enter-active,
  &-leave-active
    transition opacity 0.5s ease, transform 0.5s ease
  &-enter,
  &-leave-to
    opacity 0
    transform translateY(10px)



/* Preloader для загрузки товаров */
.contener
  &_general
    animation animball_two 1s infinite
    width 44px
    height 44px
  &_mixte
    width 44px
    height 44px
    position absolute
.ballcolor
  width 20px
  height 20px
  border-radius 50%
.ball_1,
.ball_2,
.ball_3,
.ball_4
  position absolute
  animation animball_one 1s infinite ease
.ball_1
  background-color #cb2025
  top 0
  left 0
.ball_2
  background-color #f8b334
  top 0
  left 24px
.ball_3
  background-color #00a096
  top 24px
  left 0
.ball_4
  background-color #97bf0d
  top 24px
  left 24px
@keyframes animball_one
  0%
    position absolute
  50%
    top 12px
    left 12px
    position absolute
    opacity 0.5
  100%
    position absolute
@keyframes animball_two
  0%
    transform rotate(0deg) scale(1)
  50%
    transform rotate(360deg) scale(1.3)
  100%
    transform rotate(720deg) scale(1)



.loader
  border-radius 50%
  display inline-block
  box-sizing border-box
  animation rotation 1s linear infinite


  &__cart
    /* Preloader для корзины в шапке */
    &-indicator
      width 10px
      height 10px
      border 2px solid #737373
      border-bottom-color #000000

    /* Preloader для товаров в корзине */
    &-item
      width 20px
      height 20px
      border 4px solid #bbbbbb
      border-bottom-color #666666

    /* Preloader для блока оформления в корзине */
    &-order
      width 40px
      height 40px
      border 5px solid #aaa
      border-bottom-color #fff

  /* Preloader для загрузки полей фильтра */
  &__filter-field
    width 30px
    height 30px
    border 4px solid #aaa
    border-bottom-color #fff

  /* Preloader добавления товара в корзину */
  &__product-adding
    width 16px
    height 16px
    border 2px solid #aaa
    border-bottom-color #fff


@keyframes rotation
  0%
    transform rotate(0deg)
  100%
    transform rotate(360deg)

</style>

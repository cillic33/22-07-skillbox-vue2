<template>
  <main class="content container">

    <transition name="items-fade" mode="out-in">

      <!-- Preloader -->
      <div v-if="isLoadingProductData" class="product__informer" :key="'isLoadingProductData'">
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
        <div>Товар загружается...</div>
      </div>

      <div v-else-if="isLoadingProductDataFail" class="product__informer"
           :key="'isLoadingProductDataFail'">
        <div>Произошла ошибка загрузки товара</div>
        <div>
          <button @click.prevent="loadProductData" class="btn">Попробовать еще</button>
        </div>
      </div>

      <div v-else :key="'productData'">
        <div class="content__top">
          <ul class="breadcrumbs">
            <li class="breadcrumbs__item">
              <router-link class="breadcrumbs__link" :to="{name: 'main'}">
                Каталог
              </router-link>
            </li>
            <li class="breadcrumbs__item">
              <router-link class="breadcrumbs__link"
                           :to="{name: 'main', params: {categoryId: category.id}}">
                {{ category.title }}
              </router-link>
            </li>
            <li class="breadcrumbs__item">
              <a class="breadcrumbs__link">
                {{ product.title }}
              </a>
            </li>
          </ul>
        </div>

        <section class="item">
          <div class="item__pics pics">
            <div class="pics__wrapper">
              <img width="570" height="570" :src="product.image" :alt="product.title">
            </div>
          </div>

          <div class="item__info">
            <span class="item__code">Артикул: {{ product.id }}</span>
            <h2 class="item__title">
              {{ product.title }}
            </h2>
            <div class="item__form">

              <form class="form" action="#" method="POST" @submit.prevent="addToCart">
                <b class="item__price">
                  {{ product.price | numberFormat }} ₽
                </b>

                <fieldset class="form__block">
                  <legend class="form__legend">Цвет:</legend>
                  <ProductColors :product="product"/>
                </fieldset>

                <div v-if="isCartProductAddingFail">
                  Произошла ошибка добавления товара в корзину.
                  Попробуйте еще раз.<br><br>
                </div>

                <div v-if="isCartProductAddingSuccess">
                  Товар добавлен в корзину.&nbsp;
                  <router-link :to="{name: 'cart'}" tag="button" class="btn">
                    Посмотреть
                  </router-link>
                  <br><br>
                </div>

                <div v-if="isCartProductAdding">
                  <span class="loader loader__product-adding"></span>
                  Товар добавляется...
                </div>

                <div v-else class="item__row">
                  <SetAmount v-model.number="amount"/>
                  <button class="button button--primery" type="submit">
                    В корзину
                  </button>
                </div>

              </form>

            </div>
          </div>

          <div class="item__desc">
            <ul class="tabs">
              <li class="tabs__item">
                <a class="tabs__link tabs__link--current">
                  Описание
                </a>
              </li>
              <li class="tabs__item">
                <a class="tabs__link" href="#">
                  Характеристики
                </a>
              </li>
              <li class="tabs__item">
                <a class="tabs__link" href="#">
                  Гарантия
                </a>
              </li>
              <li class="tabs__item">
                <a class="tabs__link" href="#">
                  Оплата и доставка
                </a>
              </li>
            </ul>

            <div class="item__content">
              <p>
                Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
                Синхронизация со смартфоном<br>
                Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
                Поддержка сторонних приложений<br>
              </p>

              <a href="#">
                Все характеристики
              </a>

              <h3>Что это?</h3>

              <p>
                Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои
                велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS
                синхронизируется с датчиками по ANT+, объединяя полученную с них информацию. Данные
                отображаются на дисплее, а также сохраняются на смартфоне. При этом на мобильное
                устройство можно установить как фирменное приложение, так и различные приложения
                сторонних разработчиков. Велокомпьютер точно отслеживает местоположение, принимая
                сигнал с целого комплекса спутников. Эта информация позволяет смотреть уже
                преодоленные маршруты и планировать новые велопрогулки.
              </p>

              <h3>Дизайн</h3>

              <p>
                Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют
                всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона. Корпус гаджета
                выполнен из черного пластика. На обращенной к пользователю стороне расположен
                дисплей диагональю 56 мм. На дисплей выводятся координаты и скорость, а также
                полученная со смартфона и синхронизированных датчиков информация: интенсивность,
                скорость вращения педалей, пульс и т.д. (датчики не входят в комплект поставки).
                Корпус велокомпьютера имеет степень защиты от влаги IPX7. Это означает, что
                устройство не боится пыли, а также выдерживает кратковременное (до 30 минут)
                погружение в воду на глубину не более 1 метра.
              </p>
            </div>
          </div>
        </section>
      </div>

    </transition>

  </main>
</template>

<script>
import numberFormat from '@/helpers/numderFormat';
import axios from 'axios';
import SetAmount from '@/components/SetAmount';
import ProductColors from '@/components/ProductColors';
import { API_BASE_URL } from '@/config';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  components: {
    SetAmount,
    ProductColors
  },
  data() {
    return {
      amount: 1,
      productData: null,
      isLoadingProductData: false,
      isLoadingProductDataFail: false,
    };
  },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapGetters(['isCartProductAdding', 'isCartProductAddingFail', 'isCartProductAddingSuccess']),

    product() {
      const product = this.productData
        ? this.productData
        : [];
      product.image = product.image.file.url;
      return product;
    },
    category() {
      return this.productData
        ? this.product.category
        : [];
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),
    ...mapMutations(['resetIsCartProductAddingFail', 'resetIsCartProductAddingSuccess']),

    addToCart() {
      this.addProductToCart({
        productId: this.product.id,
        quantity: this.amount
      });
    },

    loadProductData() {
      this.isLoadingProductData = true;
      this.isLoadingProductDataFail = false;

      setTimeout(() => {
        return axios
          .get(API_BASE_URL + '/api/products/' + this.$route.params.id)
          .then(response => this.productData = response.data)
          .catch(error => {
            this.isLoadingProductDataFail = true;
            console.log(error);
          })
          .then(() => this.isLoadingProductData = false);
      }, 1000);
    }
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProductData();
        this.resetIsCartProductAddingFail();
        this.resetIsCartProductAddingSuccess();
      },
      immediate: true
    }
  }
};
</script>

<style scoped lang="stylus">
.content.container
  position relative

.product
  &__informer
    position absolute
    width calc(100% - 30px)
    display flex
    flex-direction column
    align-items center
    gap 20px

.pics
  &__wrapper
    height 500px
    display flex
    align-items center
    justify-content center

    img
      max-width 400px
      max-height 400px
</style>

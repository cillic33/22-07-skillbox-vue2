<template>
  <main class="content container">

    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        Товаров: {{ productsCount }}
      </span>
    </div>

    <div class="content__catalog">

      <ProductFilter :page.sync="page" :price-from.sync="priceFrom" :price-to.sync="priceTo"
                     :category-id.sync="categoryId" :color-id.sync="colorId"/>

      <section class="catalog">

        <transition name="items-fade" mode="out-in">

          <PreloaderBall v-if="isProductsLoading" message="Товары загружаются..."></PreloaderBall>

          <div v-else-if="isProductsLoadingFail" key="isProductsLoadingFail"
               class="message__error content__catalog__div-load-products-error">
            Произошла ошибка при загрузке товаров<br><br>
            <button class="btn" @click.prevent="loadProducts()">Попробовать еще раз</button>
          </div>

          <div v-else-if="productsCount === 0" key="isProductsNotFound">По вашему запросу ничего
            не найдено
          </div>

          <ProductList v-else-if="productsData" :products="products" key="productsData"/>

        </transition>

        <BasePagination :page.sync="page" :products-count="productsCount"
                        :per-page="productsPerPage"/>

      </section>

    </div>

  </main>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination';
import ProductFilter from '@/components/ProductFilter';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import PreloaderBall from '@/components/PreloaderBall';

export default {
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
    PreloaderBall
  },
  data() {
    return {
      page: 1,
      productsPerPage: 3,
      priceFrom: 0,
      priceTo: 0,
      categoryId: 0,
      colorId: 0,

      productsData: null,
      isProductsLoading: false,
      isProductsLoadingFail: false,
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map(item => {
          return {
            ...item,
            image: item.image.file.url
          };
        })
        : [];
    },
    productsCount() {
      return this.productsData
        ? this.productsData.pagination.total
        : 0;
    },
  },
  methods: {
    loadProducts() {
      this.isProductsLoading = true;
      this.isProductsLoadingFail = false;

      clearTimeout(this.loadProductsTimer);

      this.loadProductsTimer = setTimeout(() => {
        return axios
          .get(API_BASE_URL + '/api/products', {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              minPrice: this.priceFrom,
              maxPrice: this.priceTo,
              categoryId: this.categoryId,
              colorId: this.colorId,
            }
          })
          .then(response => this.productsData = response.data)
          .catch(error => {
            this.isProductsLoadingFail = true;
            console.log(error);
          })
          .then(() => this.isProductsLoading = false);
      }, 0);
    }
  },
  watch: {
    page() {
      this.loadProducts();
    },
    priceFrom() {
      this.loadProducts();
    },
    priceTo() {
      this.loadProducts();
    },
    categoryId() {
      this.loadProducts();
    },
    colorId() {
      this.loadProducts();
    }
  },
  created() {
    this.loadProducts();
    this.categoryId = this.$route.params.categoryId ? this.$route.params.categoryId : 0;
  }
};
</script>

<style scoped lang="stylus">
.catalog
  position relative

  &__list
    grid-gap 24px

.content
  &__catalog
    &__div
      &-is-products-loading
        position absolute
        top 0
        width 100%
        display flex
        flex-direction column
        align-items center
        gap 20px

      &-load-products-error
        position absolute
</style>

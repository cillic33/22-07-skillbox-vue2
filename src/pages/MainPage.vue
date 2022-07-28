<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">

      <productFilter :page.sync="page" :price-from.sync="priceFrom" :price-to.sync="priceTo" :category-id.sync="categoryId" :color-id.sync="colorId" />

      <section class="catalog">

        <ProductList :products="products" />

        <BasePagination :page.sync="page" :products-count="productsCount" :per-page="productsPerPage" />

      </section>
    </div>
  </main>

</template>

<script>
import products from "@/data/products";
import ProductList from "@/components/ProductList.vue";
import BasePagination from '@/components/BasePagination';
import productFilter from '@/components/ProductFilter';

export default {
  components: {ProductList, BasePagination, productFilter},
  data() {
    return {
      page: 1,
      productsPerPage: 3,
      priceFrom: 0,
      priceTo: 0,
      categoryId: 0,
      colorId: 0,
    }
  },
  computed: {
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.productsFiltered.slice(offset, offset + this.productsPerPage);
    },
    productsCount() {
      return this.productsFiltered.length;
    },
    productsFiltered() {
      let productsFiltered = products;

      if (this.priceFrom > 0) {
        productsFiltered = productsFiltered.filter(product => product.price >= this.priceFrom);
      }
      if (this.priceTo > 0) {
        productsFiltered = productsFiltered.filter(product => product.price <= this.priceTo);
      }
      if (this.categoryId !== 0) {
        productsFiltered = productsFiltered.filter(product => product.categoryId === this.categoryId);
      }
      if (this.colorId > 0) {
        productsFiltered = productsFiltered.filter(product => product.colors.includes(this.colorId));
      }

      return productsFiltered;
    },
  }
};
</script>

<style scoped>

</style>

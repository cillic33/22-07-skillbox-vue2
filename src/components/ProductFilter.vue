<template>
  <aside class="filter">

    <h2 class="filter__title">Фильтры</h2>

    <form class="filter__form form" action="#" method="get">
      <!-- Поля Цена -->
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <!-- Поле Категория -->
      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <div v-if="isCategoriesDataLoading" class="loader loader__filter-field"></div>
        <div v-else-if="isCategoriesDataLoadingFail">
          <div class="message__error">Ошибка загрузки категорий</div>
          <button type="button" class="btn" @click.prevent="loadCategoriesData()">
            Попробовать еще раз
          </button>
        </div>
        <label v-else class="form__label form__label--select">
          <select class="form__select" type="text" name="category"
                  v-model.number="currentCategoryId">
            <option value="0">Все категории</option>
            <option :value="category.id" v-for="category in categories" :key="category.id">
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <!-- Поле Цвет -->
      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <div v-if="isCategoriesDataLoading" class="loader loader__filter-field"></div>
        <div v-else-if="isColorsDataLoadingFail">
          <div class="message__error">Ошибка загрузки цветов</div>
          <button type="button" class="btn" @click.prevent="loadColorsData()">Попробовать еще раз
          </button>
        </div>
        <ul v-else class="colors">
          <li class="colors__item">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" name="color"
                     v-model.number="currentColorId" :value="0">
              <span class="colors__value colors__value_all" title="Все">Все</span>
            </label>
          </li>
          <li class="colors__item" v-for="color in colors" :key="color.id">
            <label class="colors__label">
              <input class="colors__radio sr-only" type="radio" name="color"
                     v-model.number="currentColorId" :value="color.id">
              <span class="colors__value" :style="{backgroundColor: color.code}"
                    :title="color.title"></span>
            </label>
          </li>
        </ul>
      </fieldset>

      <!-- Кнопки -->
      <button class="filter__submit button button--primery" type="submit" @click.prevent="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="reset" @click.prevent="reset">
        Сбросить
      </button>
    </form>

  </aside>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  props: ['page', 'priceFrom', 'priceTo', 'categoryId', 'colorId'],
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColorId: 0,

      categoriesData: null,
      isCategoriesDataLoading: false,
      isCategoriesDataLoadingFail: false,

      colorsData: null,
      isColorsDataLoading: false,
      isColorsDataLoadingFail: false,
    };
  },
  computed: {
    categories() {
      return this.categoriesData
        ? this.categoriesData.items
        : [];
    },
    colors() {
      return this.colorsData
        ? this.colorsData.items
        : [];
    }
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    colorId(value) {
      this.currentColorId = value;
    }
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:colorId', this.currentColorId);
      this.$emit('update:page', 1);
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categoryId', 0);
      this.$emit('update:colorId', 0);
      this.$emit('update:page', 1);
      this.currentPriceFrom = 0;
      this.currentPriceTo = 0;
      this.currentCategoryId = 0;
      this.currentColorId = 0;
    },
    loadCategoriesData() {
      this.isCategoriesDataLoading = true;
      this.isCategoriesDataLoadingFail = false;

      return axios
        .get(API_BASE_URL + '/api/productCategories')
        .then(response => this.categoriesData = response.data)
        .catch(error => {
          this.isCategoriesDataLoadingFail = true;
          console.log(error);
        })
        .then(() => this.isCategoriesDataLoading = false);
    },
    loadColorsData() {
      this.isColorsDataLoading = true;
      this.isColorsDataLoadingFail = false;

      return axios
        .get(API_BASE_URL + '/api/colors')
        .then(response => this.colorsData = response.data)
        .catch(error => {
          this.isColorsDataLoadingFail = true;
          console.log(error);
        })
        .then(() => this.isColorsDataLoading = false);
    }
  },
  created() {
    this.loadCategoriesData();
    this.loadColorsData();
    this.currentCategoryId = this.$route.params.categoryId ? this.$route.params.categoryId : 0;
  }
};
</script>

<style lang="stylus" scoped>
.colors
  &__value
    display flex
    align-items center
    justify-content center

    &_all
      font-size 10px
</style>

<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a href="#" class="pagination__link pagination__link--arrow" :class="{'pagination__link--disabled' : page === 1}" aria-label="Предыдущая страница" @click.prevent="pagination(page - 1)">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>

    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a href="#" class="pagination__link" :class="{'pagination__link--current' : pageNumber === page}" @click.prevent="pagination(pageNumber)">
        {{ pageNumber }}
      </a>
    </li>

    <li class="pagination__item">
      <a href="#" class="pagination__link pagination__link--arrow" :class="{'pagination__link--disabled' : page === pages}" aria-label="Следующая страница" @click.prevent="pagination(page + 1)">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['page', 'productsCount', 'perPage'],
  computed: {
    pages() {
      return Math.ceil(this.productsCount / this.perPage);
    }
  },
  methods: {
    pagination(value) {
      if (value >=1 && value <= this.pages) {
        this.$emit('update:page', value);
      }
    }
  }
};
</script>

<style scoped>

</style>

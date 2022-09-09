<template>
  <BaseFormField :title="title" :error="error">
    <input class="form__input" v-model="valueData" :type="type" name="name" :placeholder="placeholder">
  </BaseFormField>
</template>

<script>
import baseFormFieldMixin from '@/mixins/baseFormFieldMixin';

export default {
  mixins: [ baseFormFieldMixin ],
  props: {
    type: {
      default: 'text'
    }
  }
}
</script>

<style scoped>

</style>

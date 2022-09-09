<template>
  <BaseFormField :title="title" :error="error">
    <textarea class="form__input form__input--area" v-model="valueData" name="comments" :placeholder="placeholder"></textarea>
  </BaseFormField>
</template>

<script>
import baseFormFieldMixin from '@/mixins/baseFormFieldMixin';

export default {
  mixins: [ baseFormFieldMixin ]
}
</script>

<style scoped>

</style>

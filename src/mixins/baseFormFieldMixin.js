import BaseFormField from '@/components/BaseFormField';

export default {
  props: ['title', 'error', 'value', 'placeholder'],
  components: { BaseFormField },
  computed: {
    valueData: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  }
};

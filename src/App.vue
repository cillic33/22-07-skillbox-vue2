<template>

  <div>

    <BaseHeader/>

    <router-view/>

    <BaseFooter/>

  </div>

</template>

<script>
import BaseHeader from '@/components/BaseHeader';
import BaseFooter from '@/components/BaseFooter';

export default {
  components: {BaseHeader, BaseFooter}
}
</script>

<template>
  <div :class="pageCls">
    <div v-if="$slots.error && error" class="page-error--slot">
      <slot name="error"></slot>
    </div>
    <div v-else-if="error" class="page-error">{{ error }}</div>
    <div v-else class="page-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'x-page',
    props: ['error', 'loading'],
    computed: {
      pageCls () {
        return {
          page: true,
          'page--error': !!this.error
        }
      }
    }
  }
</script>

<style scoped>

</style>

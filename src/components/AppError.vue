<template>
  <div class="alert" :class="error.type">
    <h3 class="alert-title">{{error.title}}</h3>
    <p>{{ error.message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: false,
      default: null
    }
  }
}
</script>

<style scoped>

</style>

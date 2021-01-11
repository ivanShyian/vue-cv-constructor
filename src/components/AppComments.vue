<template>
  <div class="container">
    <p v-if="comments.length === 0" style="text-align: center">
      <button class="btn primary" @click="$emit('load-comments')">Загрузить комментарии</button>
    </p>
    <div class="card" v-else>
      <h2>Комментарии</h2>
      <ul class="list">
        <li class="list-item"
            v-for="comment in comments"
            :key="comment.id">
          <div>
            <p><strong>{{ comment.email }}</strong></p>
            <small>{{ comment.name }}</small>
          </div>
        </li>
      </ul>
    </div>
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      required: false,
      default: Array
    }
  },
  emits: {
    'load-comments': {
      type: Function,
      required: false,
      default: null
    }
  }
}
</script>

<style scoped>

</style>

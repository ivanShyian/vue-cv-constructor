<template>
  <div class="loader" v-if="loading"></div>
  <div class="container" v-else>
    <p v-if="!comments.length" style="text-align: center">
      <button class="btn primary" @click="loader">Загрузить комментарии</button>
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
      default: Function
    }
  },
  data () {
    return {
      getData: this.comments,
      loading: false
    }
  },
  watch: {
    comments (value, oldValue) {
      if (value !== oldValue) {
        this.loading = false
      }
    }
  },
  methods: {
    loader () {
      this.$emit('load-comments')
      this.loading = true
    }
  }
}
</script>

<style scoped>

</style>

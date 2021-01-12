<template>
  <div class="loader" v-if="loading && !error"></div>
  <div class="container" v-else>
    <p style="text-align: center" v-if="!comments.length && !error">
      <button class="btn primary" @click="loader">Загрузить комментарии</button>
    </p>
    <div class="card error-container" v-else-if="error">
      <div>
        <h3>{{ errorType.title }}</h3>
        <p>{{ errorType.message }}</p>
      </div>
      <button class="btn primary"
              @click="loader">Повторить запрос
      </button>
    </div>
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
    },
    alert: {
      type: Object,
      required: false,
      default: Object
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
      loading: false,
      error: false,
      errorType: {}
    }
  },
  watch: {
    comments (value, oldValue) {
      if (value !== oldValue) {
        this.loading = false
        this.error = false
      }
    },
    alert (value) {
      if (value.type === 'danger') {
        this.errorType = value
        this.error = true
        this.loading = false
      }
    }
  },
  methods: {
    loader () {
      this.$emit('load-comments')
      this.loading = true
      this.error = false
    }
  }
}
</script>

<style scoped>
.error-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

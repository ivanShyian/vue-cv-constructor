<template>
  <form class="card card-w30" @submit.prevent="$emit('submitForm')">
    <div class="form-control">
      <label for="type">Тип блока</label>
      <select id="type"
              :value="blockValue"
              @input="changeBlockValue">
        <option value="title">Заголовок</option>
        <option value="subtitle">Подзаголовок</option>
        <option value="avatar">Аватар</option>
        <option value="text">Текст</option>
      </select>
    </div>

    <div class="form-control">
      <label for="value">Значение</label>
      <textarea id="value"
                rows="3"
                :value="userModelValue"
                @input="changeTextValue"
                :class="error ? 'invalid' : ''"></textarea>
      <small v-if="error">{{ error }}</small>
    </div>
    <button class="btn primary" :disabled="disabledValue">Добавить</button>
  </form>
</template>

<script>
export default {
  emits: ['update:userModelValue', 'update:blockValue', 'submitForm'],
  props: {
    userModelValue: {
      type: String,
      required: true
    },
    blockValue: {
      type: String,
      required: true
    },
    error: {
      type: String,
      required: false,
      default: null
    },
    disabledValue: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    changeBlockValue (e) {
      this.$emit('update:blockValue', e.target.value)
    },
    changeTextValue (e) {
      this.$emit('update:userModelValue', e.target.value)
    }
  }
}
</script>
<style scoped>
div.form-control textarea.invalid {
  border-color: red;
}
</style>

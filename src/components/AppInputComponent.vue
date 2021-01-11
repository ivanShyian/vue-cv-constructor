<template>
  <div class="card card-w30">
    <form @submit.prevent="$emit('submit-form')">
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
                  @input="changeTextValue"></textarea>
      </div>
      <button class="btn primary" :disabled="disabledValue">Добавить</button>
    </form>
    <button class="btn danger"
            :disabled="!blockLength"
            @click="$emit('clear')">Очистить резюме
    </button>
  </div>
</template>

<script>
export default {
  emits: {
    'update:userModelValue': {
      type: String,
      required: true
    },
    'update:blockValue': {
      type: String,
      required: true
    },
    clear: {
      type: Function,
      required: true
    },
    'submit-form': {
      type: Function,
      required: true
    }
  },
  props: {
    userModelValue: {
      type: String,
      required: true
    },
    blockValue: {
      type: String,
      required: true
    },
    blockLength: {
      type: Boolean,
      required: true
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
.card.card-w30 form {
  margin: 0 0 1rem 0;
}
.card.card-w30 button {
  width: 100%;
}
</style>

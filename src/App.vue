<template>
  <div v-if="!loading">
    <app-error v-if="alert" :error="alert"></app-error>
    <div class="container column">
      <app-input-component v-model:userModelValue.trim="userInput"
                           v-model:blockValue="blockType"
                           @submit-form="submitInput"
                           @clear="clearResume"
                           :blockLength="blockLength"
                           :disabledValue="submitButton">
      </app-input-component>
      <app-cv-output :block="buildBlock"></app-cv-output>
    </div>
    <app-comments :comments="comments"
                  :alert="alert"
                  @load-comments="getComments"></app-comments>
  </div>
  <div class="loader" v-else></div>
</template>

<script>
import axios from 'axios'
import AppInputComponent from '@/components/AppInputComponent'
import AppCvOutput from '@/components/AppCvOutput'
import AppComments from '@/components/AppComments'
import AppError from '@/components/AppError'

export default {
  data () {
    return {
      blockType: 'title',
      userInput: '',
      buildBlock: [],
      comments: [],
      alert: {},
      error: false,
      loading: false
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    submitButton () {
      return this.userInput.length < 4
    },
    blockLength () {
      return this.buildBlock.length > 0
    }
  },
  methods: {
    async submitInput () {
      try {
        if (this.userInput.length < 4) {
          throw new Error('Big brother is watching you')
        }
        await axios.post('https://vue-cv-project-default-rtdb.europe-west1.firebasedatabase.app/resume.json', {
          type: this.blockType,
          input: this.userInput
        })
        this.buildBlock.push({
          type: this.blockType,
          input: this.userInput
        })
        this.alertMessage('primary', 'Успешно', 'Элемент добавлен успешно')
      } catch (e) {
        this.error = true
        this.alertMessage('danger', 'JUST NO', e.message)
      } finally {
        this.blockType = 'title'
        this.userInput = ''
        this.clearAlert()
      }
    },
    async getData () {
      try {
        this.loading = true
        const { data } = await axios.get('https://vue-cv-project-default-rtdb.europe-west1.firebasedatabase.app/resume.json')
        if (!data) {
          throw new Error('Данные отсутствуют')
        }
        this.buildBlock = Object.keys(data).map(el => {
          return {
            id: el,
            type: data[el].type,
            input: data[el].input
          }
        })
        this.alertMessage('primary', 'Успешно', 'Данные успешно загружены')
      } catch (e) {
        this.error = true
        this.alertMessage('danger', 'Ошибка', e.message)
      } finally {
        this.loading = false
        this.clearAlert()
      }
    },
    async clearResume () {
      try {
        await axios.delete('https://vue-cv-project-default-rtdb.europe-west1.firebasedatabase.app/resume.json')
        this.buildBlock = []
        this.alertMessage('primary', 'Успешно', 'Резюме успешно очищенно')
      } catch (e) {
        this.error = true
        this.alertMessage('danger', 'Что-то пошло не так..', e.message)
      } finally {
        this.clearAlert()
      }
    },
    async getComments () {
      try {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/comments?_limit=42')
        if (!data) {
          throw new Error('Невозможно загрузить комментарии')
        }
        this.comments = data
        this.alertMessage('primary', 'Успешно', 'Комментарии загружены успешно')
      } catch (e) {
        this.alertMessage('danger', 'Что-то пошло не так..', e.message)
      } finally {
        this.clearAlert()
      }
    },
    alertMessage (type, title, message) {
      this.alert = {
        type,
        title,
        message
      }
    },
    clearAlert () {
      setTimeout(() => {
        this.error = false
        this.alert = {}
      }, 2000)
    }
  },
  components: {
    AppInputComponent,
    AppCvOutput,
    AppComments,
    AppError
  }
}
</script>

<style>
.avatar {
  display: flex;
  justify-content: center;
}

.avatar img {
  width: 250px;
  height: auto;
  border-radius: 50%;
}
</style>

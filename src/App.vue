<template>
  <app-error v-if="error" :error="error"></app-error>
  <div class="container column">
    <app-input-component v-model:userModelValue.trim="userInput"
                         v-model:blockValue="blockType"
                         @submitForm="submitInput"
                         @clear="clearResume"
                         :blockLength="hasData"
                         :disabledValue="submitButton">
    </app-input-component>
    <app-cv-output :block="buildBlock"></app-cv-output>
  </div>
  <app-comments :comments="comments"></app-comments>
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
      error: null,
      comments: null
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    submitButton () {
      return this.userInput.length < 4
    },
    hasData () {
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
      } catch (e) {
        this.error = {
          type: 'danger',
          title: 'JUST NO',
          message: e.message
        }
        setTimeout(() => {
          this.error = null
        }, 2000)
      } finally {
        this.blockType = 'title'
        this.userInput = ''
      }
    },
    async getData () {
      try {
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
      } catch (e) {
        this.error = {
          type: 'danger',
          title: 'Ошибка',
          message: e.message
        }
        setTimeout(() => {
          this.error = null
        }, 2000)
      }
    },
    async clearResume () {
      try {
        await axios.delete('https://vue-cv-project-default-rtdb.europe-west1.firebasedatabase.app/resume.json')
        this.buildBlock = []
      } catch (e) {
        this.error = {
          type: 'danger',
          title: 'Что-то пошло не так..',
          message: e.message
        }
        setTimeout(() => {
          this.error = null
        }, 2000)
      }
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
  width: 150px;
  height: auto;
  border-radius: 50%;
}
</style>

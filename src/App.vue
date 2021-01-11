<template>
  <div class="container column">
    <app-input-component v-model:userModelValue.trim="userInput"
                         v-model:blockValue="blockType"
                         @submitForm="submitInput"
                         :error="errorMessage"
                         :disabledValue="submitButton">
    </app-input-component>
    <app-cv-output :block="buildBlock"></app-cv-output>
  </div>
<!--  <app-comments></app-comments>-->
</template>

<script>
import AppInputComponent from '@/components/AppInputComponent'
import AppCvOutput from '@/components/AppCvOutput'
// import AppComments from '@/components/AppComments'

export default {
  data () {
    return {
      blockType: 'title',
      userInput: '',
      errorMessage: null,
      buildBlock: []
    }
  },
  computed: {
    submitButton () {
      return this.userInput.length < 4
    }
  },
  methods: {
    submitInput () {
      if (this.userInput.length === 0) {
        this.errorMessage = 'Поле не может быть пустым'
      } else {
        this.errorMessage = null
        this.buildBlock.push({
          type: this.blockType,
          input: this.userInput
        })
        this.blockType = 'title'
        this.userInput = ''
      }
    }
  },
  components: {
    AppInputComponent,
    AppCvOutput
    // AppComments
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

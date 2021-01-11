<template>
  <div class="container column">
    <app-input-component v-model:userModelValue.trim="userInput"
                         v-model:blockValue="blockType"
                         @submitForm="submitInput"
                         :error="errorMessage">
    </app-input-component>
    <app-cv-output></app-cv-output>
    <!--  <app-comments></app-comments>-->
  </div>

</template>

<script>
export default {
  data () {
    return {
      blockType: 'title',
      userInput: '',
      errorMessage: null
    }
  },
  methods: {
    submitInput () {
      if (this.userInput.length === 0) {
        this.errorMessage = 'Поле не может быть пустым'
      } else if (this.userInput.length < 3) {
        this.blockType = 'title'
        this.userInput = ''
        this.errorMessage = 'Поле ожидает не менее 3 символов'
      } else {
        this.errorMessage = null
        console.log(this.blockType)
        console.log(this.userInput)
        console.log(this.errorMessage)
        this.blockType = 'title'
        this.userInput = ''
      }
    }
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

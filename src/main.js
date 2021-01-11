import { createApp } from 'vue'
import App from './App.vue'
import AppInputComponent from '@/components/AppInputComponent'
import AppCvOutput from '@/components/AppCvOutput'
import AppComments from '@/components/AppComments'
import './theme.css'

const app = createApp(App)
app.component('app-input-component', AppInputComponent)
app.component('app-cv-output', AppCvOutput)
app.component('app-comments', AppComments)
app.mount('#app')

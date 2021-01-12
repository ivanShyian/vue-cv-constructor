<template>
  <div class="card card-w70" v-if="block">
    <div v-if="block.length">
      <div v-for="item in block" :key="item">
        <component :is="'cv-output-' + item.type" :inputValue="item.input"></component>
      </div>
    </div>
    <h3 v-else>Добавьте первый блок, чтобы увидеть результат</h3>
  </div>
</template>

<script>
import CvOutputTitle from '@/components/CvOutputTitle'
import CvOutputSubtitle from '@/components/CvOutputSubtitle'
import CvOutputText from '@/components/CvOutputText'
import CvOutputAvatar from '@/components/CvOutputAvatar'

export default {
  props: {
    block: {
      type: Array,
      required: false,
      default: Array
    }
  },
  components: {
    CvOutputTitle,
    CvOutputSubtitle,
    CvOutputText,
    CvOutputAvatar
  }
}
</script>

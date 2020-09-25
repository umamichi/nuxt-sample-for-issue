<template lang="pug">
  .loading(v-show="isLoading")
    ModalLoading
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ModalLoading from '@/components/pages/modal/common/modalLoading.vue'

@Component({
  components: {
    ModalLoading
  }
})
export default class Loading extends Vue {
  /**
   * 画面遷移中判定
   * @returns 画面遷移中でTRUEを返す
   */
  public get isLoading(): boolean {
    return this.$store.getters['loading/isLoading']
  }
}
</script>

<style lang="scss" scoped>
.loading {
  z-index: 10000;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>

<template lang="pug">
article
  .wrapOver
    .wrapTabContent
      .tabContent01
        jobContentTopView
        JobContentSlider
</template>

<script lang="ts">
import { Component, Emit, Vue, Prop, Watch } from 'nuxt-property-decorator'
import JobContentTopView from '@/components/pages/job/jobInformationDetail/jobContentTopView.vue'
import JobContentSlider from '@/components/pages/job/jobInformationDetail/jobContentSlider.vue'

@Component({
  components: {
    JobContentTopView,
    JobContentSlider
  }
})
export default class Detail extends Vue {}
</script>

<style lang="scss" scoped>
.wrapTabContent {
  width: 100%;

  .tabContent01,
  .tabContent02,
  .tabContent03 {
    width: 100%;
    padding: 24px 0 16px;
    @include pc {
      padding: 32px 0 16px;
    }
  }

  .off {
    display: none;
  }
}
</style>

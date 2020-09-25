<template lang="pug">
section.wrap
  .wrapItem
    h1.text {{"Detail Page Sample"}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class JobContentTopView extends Vue {}
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  margin: 0 auto;
  padding: 16px 0 24px;
  @include pc {
    max-width: 1034px;
    padding: 24px 17px 32px;
    box-sizing: border-box;
  }
}

.text {
  font-size: $px18;
  font-weight: bold;
  line-height: $px28;
  letter-spacing: 1px;
  margin-bottom: 16px;
  @include pc {
    font-size: $px24;
    line-height: $px34;
    letter-spacing: 0;
    margin-bottom: 24px;
  }
}
</style>

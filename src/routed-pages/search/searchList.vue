<template lang="pug">
.contents
  .div(
    :class="'wrapJobOfferSearch'"
  ).clear
    SearchList

  FloorSwitching(
    v-if="searchConditionOccupation1stIdList.length === 1"
    :occupationFirstId="searchConditionOccupation1stIdList[0]"
  )

  Switching(
    v-if="searchConditionKodawariIdList.length === 1"
    :kodawariId="searchConditionKodawariIdList[0]"
  )

</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import SearchList from '@/components/pages/search/searchList.vue'
import FloorSwitching from '@/components/pages/search/floorSwitching.vue'
import Switching from '@/components/pages/search/switching.vue'

@Component({
  components: {
    SearchList,
    FloorSwitching,
    Switching
  },
  layout: 'layoutFull'
})
export default class SearchListPage extends Vue {
  public get searchConditionOccupation1stIdList(): string[] {
    const occupation1stIdList: string[] = []
    return occupation1stIdList
  }

  public get searchConditionKodawariIdList(): number[] {
    return []
  }
}
</script>

<style lang="scss" scoped>
.wrapJobOfferSearch {
  width: 100%;
  margin: 0 auto;
  padding-bottom: 24px;
  @include pc {
    max-width: 1034px;
    padding: 24px 17px 48px;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
  }
}
</style>

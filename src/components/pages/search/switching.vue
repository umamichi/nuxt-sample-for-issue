<template lang="pug">
  div
    kodawari(:kodawariId = "kodawariId")
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

import kodawari from '@/components/include/searchResult/kodawari.vue'

@Component({
  components: {
    kodawari
  }
})
export default class Switching extends Vue {
  @Prop({ type: Number, required: false })
  public kodawariId: number
}
</script>

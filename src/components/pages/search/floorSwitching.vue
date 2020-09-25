<template lang="pug">
  JobType(:occupationFirstId="occupationFirstId")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import JobType from '@/components/include/searchResult/jobType.vue'

@Component({
  props: ['occupationFirstId'],
  components: {
    JobType
  }
})
export default class FloorSwitching extends Vue {}
</script>

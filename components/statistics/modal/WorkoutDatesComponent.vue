<template>
  <div>
    <ul class="list-group my-2">
      <date-component
        v-for="(date, key) in datesPaginated"
        :key="key"
        :date="date"
      ></date-component>
    </ul>
    <dates-pagination v-if="hasMore" @loadMore="onLoadMore"></dates-pagination>
  </div>
</template>
<script>
  import { DatesPagination, DateComponent } from './'

  export default {
    props: ['dates'],
    computed: {
      datesPaginated () { return this.dates.slice(0, this.actualSize) },
      hasMore () { return this.dates.length > this.actualSize }
    },
    methods: {
      onLoadMore () { this.actualSize += this.pageSize }
    },
    components: { DatesPagination, DateComponent },
    data () {
      return {
        actualSize: 2,
        pageSize: 2
      }
    }
  }
</script>

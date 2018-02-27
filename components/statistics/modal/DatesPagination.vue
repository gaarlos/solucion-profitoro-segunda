<template>
  <span class="profitoro-link" @click="loadMore">More</span>
</template>
<script>
  export default { methods: { loadMore () { this.$emit('loadMore') } } }
</script>
<style scoped lang="scss">
  .profitoro-link {
    color: rgba(241,93,89,.7)!important;

    cursor: pointer!important;
    &:active, &:hover {
      color: rgb(241,93,89)!important;
    }
  }
</style>

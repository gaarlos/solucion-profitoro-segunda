<template>
  <li class="list-group-item">
    {{ fDate }}
  </li>
</template>
<script>
  import moment from 'moment'

  export default {
    props: ['date'],
    computed: { fDate () { return moment(this.date).format('DD/MM/YY hh:mm:ss') } }
  }
</script>

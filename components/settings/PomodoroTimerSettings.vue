<template>
  <div class="container">
    <h2 class="title text-center mb-5">Set your pomodoro timer</h2>    
    <div class="mt-5 row justify-content-center align-items-center">
      <template v-for="tconfig in timerConfig">
        <div :class="'set-timer-container col-sm-8 col-md-' + tconfig.size " :key="tconfig.size">
          <clip-loader v-show="isLoading(tconfig.set)" />
          <set-timer class="set-timer set-timer-1" v-show="!isLoading(tconfig.set)" :value="getConfigSet(tconfig.set)" @valueChanged="value => actionSet(tconfig.set, value)"></set-timer>
            <div class="figure-caption">{{ tconfig.set }}</div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions, mapState} from 'vuex'
  import SvgCircleSector from '~/components/timer/SvgCircleSector'
  import SetTimer from '~/components/settings/SetTimer'
  import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
  import { camelize } from '~/utils/utils'
  export default {
    data () {
      return {
        timerConfig: [
          {size: 5, set: 'Working Pomodoro'},
          {size: 4, set: 'Long Break'},
          {size: 3, set: 'Short Break'}
        ]
      }
    },
    computed: {
      ...mapGetters({
        config: 'getConfig'
      }),
      ...mapState(['loading'])
    },
    components: {
      SvgCircleSector,
      SetTimer,
      ClipLoader
    },
    methods: {
      ...mapActions(['setPomodoro']),
      camelize: camelize,
      isLoading (set) { return this.loading[this.getActionSet(set)] },
      getActionSet (set) { return 'set' + set.replace(' ', '') },
      getConfigSet (set) { return this.config[this.camelize(set)] },
      actionSet (set, value) {
        this.setPomodoro({set: this.getActionSet(set), value})
      }
    }
  }
</script>
<style lang="scss">
  @import "../../assets/styles/vendors/bootstrap/functions";
  @import "../../assets/styles/vendors/bootstrap/variables";
  @import "../../assets/styles/vendors/bootstrap/mixins";

  .container {
    @include media-breakpoint-down(sm) {
      margin-top: 50px;
    }
  }
  .set-timer-container {
    @include media-breakpoint-down(sm) {
      margin-bottom: 20px;
    }
  }
  .figure-caption {
    text-align: center;
  }
</style>

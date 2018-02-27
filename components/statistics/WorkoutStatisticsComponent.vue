<template>
  <div data-toggle="modal" data-target="#workoutModal" @click="openModal">
    <div class="progress my-3 d-flex align-items-center justify-content-between" :style="{ 'background-color': bg.bg }">
      <div :style="{ 'width': 'calc( ' + 100 + '% - 3rem )', 'position': 'relative'}">
        <div class="workout-name text d-flex align-items-center pl-2">{{ workoutInfo.name }}</div>
        <transition name="fade">
          <div v-if="showProgress"
            class="progress-mm mr-3 pl-2 d-flex align-items-center animated"
            :style="{ 'width': valueNow + '%', 'background-color': bg.color}"
          ></div>
        </transition>
      </div>
      <transition name="fade">
        <div v-if="showTimes" :style="{ 'width': '3rem', 'text-align': 'right'}" class="text">{{ workout.times }}</div>
      </transition>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['workoutInfo', 'workout', 'max', 'bg', 'index'],
    computed: { valueNow () { return this.workout.times / this.max * 100 } },
    methods: { openModal () { this.$emit('openModal', { name: this.workoutInfo.name, workout: this.workout }) } },
    mounted () {
      setTimeout(() => { this.showProgress = true }, 1000)
      setTimeout(() => { this.showTimes = true }, 3000)
    },
    data () {
      return {
        showTimes: false,
        showProgress: false
      }
    }
  }
</script>
<style lang="scss" scoped>
  @keyframes progress { 0% { width: 0; } }

  .workout-name {
    position: absolute;
    text-align: left;
    height: 100%;
  }

  .text {
    font-size: 1rem;
    font-weight: bold;
    color: white;
  }

  .progress {
    padding: 10px;
    width: 100%!important;
    height: 3rem;
    border-radius: .2rem;
  }

  .progress-mm {
    text-align: left;
    height: calc( 3rem - 20px );
    border-radius: .2rem;
  }

  .animated {
    animation-name: progress;
    animation-duration: 2s;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .25s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

<template>
  <div>
    <header-component></header-component>
    <div class="container min-full-height">
      <div class="main-content row">
        <div class="col-sm-12">
          <h2 class="title mb-3">Statistics</h2>
          <div>
            <h2 class="headline">Total Pomodoros: {{totalPomodoros}}</h2>
            <hr>
          </div>
          <div class="progress-bar-container pl-sm-5">
            <workout-statistics-component
              v-for="(workout, key, index) in workouts"
              :max="max"
              :workoutInfo="getWorkout(key)"
              :workout="workout"
              :key="key"
              :bg="bg(index)"
              @openModal="updateInfo"
            ></workout-statistics-component>
            <statistics-modal-component :workout="workout"></statistics-modal-component>
          </div>
        </div>
      </div>
    </div>
    <footer-component></footer-component>
  </div>
</template>
<script>
  import { WorkoutStatisticsComponent } from '~/components/statistics'
  import { StatisticsModalComponent } from '~/components/statistics/modal'
  import { HeaderComponent, FooterComponent } from '~/components/common'

  import {mapGetters} from 'vuex'
  export default {
    middleware: 'authenticated',
    computed: {
      ...mapGetters({
        totalPomodoros: 'getTotalPomodoros',
        totalWorkouts: 'getWorkouts',
        workouts: 'getDoneWorkouts'
      }),
      max () {
        var aux = 0
        for (let i in this.workouts) { this.workouts[i].times > aux ? aux = this.workouts[i].times : null }

        return aux
      }
    },
    methods: {
      bg (index) { return { color: this.colors[index % 4], bg: this.bgColor[index % 2] } },
      updateInfo (e) {
        this.workout = e.workout
        this.workout.name = e.name
      },
      getWorkout (key) {
        return this.totalWorkouts.filter(obj => obj['.key'] === key)[0]
      }
    },
    components: {
      WorkoutStatisticsComponent,
      StatisticsModalComponent,
      HeaderComponent,
      FooterComponent
    },
    data () {
      return {
        colors: ['#eb3434', '#3734eb', '#32cc3f', '#7c3225'],
        bgColor: ['#d2d2d2', '#a0a0a0'],
        workout: {
          name: '',
          times: '',
          totalTime: 0,
          workoutDates: []
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .headline {
    font-family: Arial, Helvetica, sans-serif;
    color: rgb(100, 100, 100);
  }
</style>

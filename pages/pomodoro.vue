<template>
  <div>
    <header-component></header-component>    
    <div class="container min-full-height">
      <div class="main-content row">        
        <div :class="[state != 0 || todolistvisible ? 'col-sm-12 col-md-6 col-lg-5' : 'col-2']">
          <div v-if="state != 0">
            <div v-if="!showKittens">
              <clip-loader :loading="loadingWorkoutImage"></clip-loader>
              <img v-show="loadedWorkoutImage" class="img-fluid rounded" @load="handleLoadedImage" :src="chosenWorkout.picture" :alt="chosenWorkout.name">
              <h2 class="title">{{ chosenWorkout.name }}</h2>
              <p class="description">
                {{ chosenWorkout.description }}
              </p>
            </div>
            <div v-if="showKittens">
              <kittens-component></kittens-component>
            </div>
            <div v-if="!showKittens">
              <button type="button" class="button button-primary">Done!</button>
              <button type="button" class="button button-primary">Next</button>
            </div>
            <div class="lazy-section">
              <h4 class="title">Feeling <span class="bold">{{ showKittens ? 'energetic' : 'lazy' }}</span>?</h4>
              <button type="button" class="button button-primary-faded" @click="toggleKittens">{{ showKittens ? showWorkoutsButtonText : showKittensButtonText }}</button>
            </div>
          </div>
          <div v-if="state == 0">
            <a class="profitoro-link" data-toggle="collapse" href="#todolist" aria-expanded="true" @click="toggleToDoListVisible">
              {{ todolistvisible ? 'Hide ToDo List' : 'Show ToDo List'}}
            </a>
            <to-do-list class="collapse show" aria-expanded="true" id="todolist"></to-do-list>
          </div>
        </div>
        <div class="countdown-holder" :class="[state != 0 || todolistvisible ? 'col-sm-12 col-md-6 col-lg-7' : 'col-12']">
          <count-down-timer ref="countdowntimer" @finished="togglePomodoro" :time="time"></count-down-timer>
        </div>
      </div>
    </div>
    <footer-component></footer-component>
  </div>
</template>
<script>
  import CountDownTimer from '~/components/timer/CountDownTimer'
  import KittensComponent from '~/components/timer/KittensComponent'
  import ToDoList from '~/components/todos/ToDoList'
  import { HeaderComponent, FooterComponent } from '~/components/common'
  import { mapGetters, mapActions } from 'vuex'
  import { beep } from '~/utils/utils'
  import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

  const STATE = {
    WORKING: 0,
    SHORT_BREAK: 1,
    LONG_BREAK: 2
  }
  export default {
    data () {
      return {
        state: STATE.WORKING,
        pomodoros: 0,
        source: require('~/assets/images/pushups.png'),
        chosenWorkout: {name: '', description: '', picture: ''},
        showKittens: false,
        showKittensButtonText: 'Show me some kittens!',
        showWorkoutsButtonText: 'I wanna exercise!',
        todolistvisible: true,
        loadingWorkoutImage: true,
        loadedWorkoutImage: false
      }
    },
    computed: {
      ...mapGetters({
        config: 'getConfig',
        totalPomodoros: 'getTotalPomodoros',
        workouts: 'getWorkouts',
        doneWorkouts: 'getDoneWorkouts',
        authenticated: 'isAuthenticated'
      }),
      time () {
        let minutes

        switch (this.state) {
          case STATE.WORKING:
            minutes = this.config.workingPomodoro
            break
          case STATE.SHORT_BREAK:
            minutes = this.config.shortBreak
            break
          case STATE.LONG_BREAK:
            minutes = this.config.longBreak
            break
          default:
            minutes = this.config.workingPomodoro
            break
        }

        return minutes * 60
      }
    },
    components: {
      FooterComponent,
      HeaderComponent,
      CountDownTimer,
      KittensComponent,
      ToDoList,
      ClipLoader
    },
    watch: {
      state () {
        if (this.state !== STATE.WORKING && this.authenticated) {
          const done = this.doneWorkouts !== undefined
                     ? this.doneWorkouts[this.chosenWorkout['.key']] || {}
                     : {}

          done.key = this.chosenWorkout['.key']

          done.workoutDates = done.hasOwnProperty('workoutDates')
              ? done.workoutDates
              : []

          done.times = done.hasOwnProperty('times')
              ? done.times
              : 0

          done.totalTime = done.hasOwnProperty('totalTime')
              ? done.totalTime
              : 0

          done.workoutDates.push(Date.now())
          done.times++
          done.totalTime += this.time

          this.updateWorkoutStatistics(done)
        }
      }
    },
    methods: {
      ...mapActions(['updateTotalPomodoros', 'updateWorkoutStatistics']),
      getRandomWorkout () {
        return this.workouts[Math.floor(Math.random() * this.workouts.length)]
      },
      togglePomodoro () {
        beep()
        switch (this.state) {
          case STATE.WORKING:
            // we have switched to the break state, increase the number of pomodoros and choose between long and short break
            this.pomodoros ++
            if (this.authenticated) {
              this.updateTotalPomodoros(this.totalPomodoros + 1)
            }
            this.state = this.pomodoros % this.config.pomodorosTillLongBreak === 0
              ? STATE.LONG_BREAK : STATE.SHORT_BREAK
            this.chosenWorkout = this.getRandomWorkout()
            if (this.chosenWorkout.pictures && this.chosenWorkout.pictures.length) {
              this.chosenWorkout.picture = this.chosenWorkout.pictures[0]
              this.loadingWorkoutImage = true
              this.loadedWorkoutImage = false
            }
            alert('Time for exercise!')
            break
          default:
            // time to work!
            this.state = STATE.WORKING
            alert('Time to work!')
            break
        }
        this.$refs.countdowntimer.start()
      },
      toggleKittens () {
        this.showKittens = !this.showKittens
      },
      toggleToDoListVisible () {
        this.todolistvisible = !this.todolistvisible
      },
      handleLoadedImage () {
        this.loadingWorkoutImage = false
        this.loadedWorkoutImage = true
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../assets/styles/base/fontSizes";

  .title {
    margin: 10px 0;
  }
  .description {
    margin: 20px 0;
    color: #999;
  }
  .button-primary {
    width: 47.5%;
    margin: 0;

    &:first-of-type {
      margin-right: 5%;
      padding: 0;
      float: left;
    }
  }
  .lazy-section {
    margin-top: 40px;

    .title {
      font-size: $font-size-medium;
    }
  }
  a.profitoro-link {
    color: rgba(241,93,89,.7);
    cursor: pointer;

    &:active, &:hover {
      color: rgb(241,93,89);
    }
  }
</style>

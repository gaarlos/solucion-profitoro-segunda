<template>
  <div class="modal fade" id="workoutModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ workout.name }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div>Times: {{ workout.times }}</div>
          <div>Total time: {{ text }}</div>          
          <div><workout-dates-component :dates="workout.workoutDates"></workout-dates-component></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-sm btn-dark" data-dismiss="modal" aria-label="Close">
            <span class="text-white" aria-hidden="true">Close</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { WorkoutDatesComponent } from './'

  export default {
    props: ['workout'],
    computed: {
      hours () { return Math.floor(this.workout.totalTime / 3600) },
      minutes () { return Math.floor((this.workout.totalTime % 3600) / 60) },
      seconds () { return this.workout.totalTime % 60 },
      text () {
        return this.addZero(this.hours) +
         ':' + this.addZero(this.minutes) +
         ':' + this.addZero(this.seconds)
      }
    },
    components: { WorkoutDatesComponent },
    methods: { addZero (time) { return ('' + time).length > 1 ? time : '0' + time } }
  }
</script>

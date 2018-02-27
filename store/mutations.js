import _ from 'lodash'

export default {
  setPomodoro (state, pomodoroSet, podomodoValue) {
    state.config[pomodoroSet] = podomodoValue
  },
  setUser (state, value) {
    state.user = value
  },
  setConfigRef (state, value) {
    state.configRef = value
  },
  setStatisticsRef (state, value) {
    state.statisticsRef = value
  },
  setWorkoutsRef (state, value) {
    state.workoutsRef = value
  },
  setDisplayName (state, value) {
    state.displayName = value
  },
  setAuthError (state, value) {
    state.authError = value
  },
  markAsDone (state, todoId) {
    _.find(state.todos, todo => todo.id === todoId).active = false
  },
  setActive (state, { id, value }) {
    _.find(state.todos, todo => todo.id === id).active = value
  },
  setInProgress (state, { id, value }) {
    _.find(state.todos, todo => todo.id === id).progress = value
  },
  setPomorodosWhenStarted (state, {id, pomodoros}) {
    _.find(state.todos, todo => todo.id === id).pomodorosWhenStarted = pomodoros
  },
  setToDoPomodoros (state, {id, pomodoros}) {
    _.find(state.todos, todo => todo.id === id).pomodoros = pomodoros
  },
  addTodo (state, todo) {
    state.todos.push(todo)
  },
  clearToDos (state, todos) {
    state.todos = _.without(state.todos, ...todos)
  },
  setLoading (state, loading) {
    state.loading = {...state.loading, ...loading}
  }
}

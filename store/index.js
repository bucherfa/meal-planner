import Vue from 'vue'

export const state = () => ({
  week: new Date(),
  data: {},
  header: {
    closable: false
  },
  toCopy: []
})

export const mutations = {
  updateWeek (state, value) {
    state.week = value
  },
  saveDay (state, value) {
    Vue.set(state.data, value.dayKey, value.day)
  },
  setHeaderClosable (state, value) {
    state.header.closable = value
  },
  setCopy (state, value) {
    state.toCopy = value
  },
  setData (state, value) {
    state.data = value
  }
}

export const actions = {
  updateWeek ({ commit }, week) {
    commit('updateWeek', week)
  },
  saveDay ({ commit }, value) {
    commit('saveDay', value)
  },
  activateClosableHeader ({ commit }) {
    commit('setHeaderClosable', true)
  },
  deactivateClosableHeader ({ commit }) {
    commit('setHeaderClosable', false)
  },
  startCopy ({ commit, getters }) {
    const toCopy = Object.values(JSON.parse(JSON.stringify(getters.weekDays)))
    commit('setCopy', toCopy)
  },
  resetCopy ({ commit }) {
    commit('setCopy', [])
  },
  applyCopy ({ commit, dispatch, getters }) {
    const dateKeys = Object.keys(JSON.parse(JSON.stringify(getters.weekDays)))
    const dayValues = JSON.parse(JSON.stringify(getters.toCopy))
    for (let i = 0; i < dateKeys.length; i++) {
      commit('saveDay', { dayKey: dateKeys[i], day: dayValues[i] })
    }
    dispatch('resetCopy')
  },
  setData ({ commit }, value) {
    commit('setData', value)
  },
  resetData ({ dispatch }) {
    dispatch('setData', {})
  }
}

export const getters = {
  defaultMeals: () => {
    return {
      breakfast: [],
      lunch: [],
      snack: [],
      dinner: []
    }
  },
  weekDays: (state, getters) => {
    const weekDays = {}
    const startDate = new Date(state.week)
    startDate.setDate(startDate.getDate() - startDate.getDay() + 1)
    for (let i = 0; i < 7; i++) {
      const key = new Date(startDate).toISOString().split('T')[0]
      if (state.data[key]) {
        weekDays[key] = state.data[key]
      } else {
        weekDays[key] = JSON.parse(JSON.stringify(getters.defaultMeals))
      }
      startDate.setDate(startDate.getDate() + 1)
    }
    return JSON.parse(JSON.stringify(weekDays))
  },
  day: (state, getters) => (key) => {
    return state.data[key] || JSON.parse(JSON.stringify(getters.defaultMeals))
  },
  headerClosable: state => state.header.closable,
  suggestions: (state, getters) => {
    const suggestions = JSON.parse(JSON.stringify(getters.defaultMeals))
    const arrayOfDays = Object.values(state.data)
    for (const meal of Object.keys(suggestions)) {
      suggestions[meal] = arrayOfDays.flatMap(day => day[meal])
      suggestions[meal] = suggestions[meal].filter((value, index, self) => self.indexOf(value) === index)
      suggestions[meal].sort()
    }
    return suggestions
  },
  toCopy: state => state.toCopy,
  week: state => state.week,
  data: state => state.data
}

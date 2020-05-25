export const state = () => ({
  week: new Date(),
  data: {},
  header: {
    closable: false
  }
})

export const mutations = {
  updateWeek (state, value) {
    state.week = value
  },
  saveDay (state, value) {
    state.data[value.dayKey] = value.day
  },
  setHeaderClosable (state, value) {
    state.header.closable = value
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
    const startDate = new Date()
    startDate.setDate((state.week.getDate() - state.week.getDay()))
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
    }
    return suggestions
  }
}

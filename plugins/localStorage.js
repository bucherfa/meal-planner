import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: '_meal-planner',
    paths: ['data']
  })(store)
}

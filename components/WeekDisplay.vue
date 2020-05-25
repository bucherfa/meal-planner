<template>
  <div>
    <WeekDisplayItem v-for="(day, key) of weekDays" :key="key" :day="day" :day-key="key" />
  </div>
</template>

<script>
import WeekDisplayItem from './WeekDisplayItem'
export default {
  name: 'WeekDisplay',
  components: { WeekDisplayItem },
  computed: {
    weekDays () {
      return this.$store.getters.weekDays
    }
  }
}
</script>

<style scoped>

</style>

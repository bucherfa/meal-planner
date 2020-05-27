<template>
  <main class="main">
    <WeekSelector />
    <WeekDisplay />
  </main>
</template>

<script>
import WeekSelector from '../components/WeekSelector'
import WeekDisplay from '../components/WeekDisplay'

export default {
  components: {
    WeekDisplay,
    WeekSelector
  }
}
</script>

<style>
.main {
  margin-top: 3.3rem;
  text-align: center;
}
</style>

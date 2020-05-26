<template>
  <div class="selector">
    <el-button class="selector__button" icon="el-icon-arrow-left" @click="changeDate(-7)" />
    <el-date-picker
      v-model="week"
      type="week"
      format="Week WW"
      placeholder="Pick a week"
      class="selector__week"
      :clearable="false"
      @change="handleWeekChange"
    />
    <el-button class="selector__button" icon="el-icon-arrow-right" @click="changeDate(7)" />
  </div>
</template>

<script>
export default {
  name: 'WeekSelector',
  data () {
    return {
      week: undefined
    }
  },
  created () {
    this.week = this.$store.getters.week || new Date()
  },
  methods: {
    handleWeekChange () {
      this.$store.dispatch('updateWeek', this.week)
    },
    changeDate (amount) {
      const date = new Date(this.week)
      date.setDate(date.getDate() + amount)
      this.week = date
      this.handleWeekChange()
    }
  }
}
</script>

<style scoped>
.selector {
  margin-top: 1rem;
}
.selector__week {
  width: 8rem;
}
.selector__button {
  padding: 11.5px 20px;
}
</style>

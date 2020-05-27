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
      :picker-options="{ firstDayOfWeek: 1 }"
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
      window.scroll(0, 0)
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
  background: white;
  position: fixed;
  width: 100%;
  padding: 0.5rem 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 50;
}
.selector__week {
  width: 8rem;
}
.selector__button {
  padding: 11.5px 20px;
}
</style>

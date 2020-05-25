<template>
  <el-card class="item" :class="dayInPast ? 'item--past' : ''" shadow="always">
    <div slot="header" class="item__header">
      <span>{{ displayDate }}</span>
      <span v-if="today" class="item__today" />
      <el-button class="item__action" icon="el-icon-edit" type="text" @click="handleActionClick" />
    </div>
    <div v-for="(meal, mealKey) of day" :key="mealKey" class="item__item">
      <span class="item__item-title">{{ displayStringFirstCap(mealKey) }}</span>
      <div class="item__item-body">
        {{ meal.join(', ') }}
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'WeekDisplayItem',
  props: {
    day: {
      default: () => {},
      type: Object
    },
    dayKey: {
      default: '2020-01-01',
      type: String
    }
  },
  data () {
    return {}
  },
  computed: {
    displayDate () {
      let language = 'en-us'
      if (process.browser) {
        language = window.navigator.language
      }
      const options = { weekday: 'short', month: 'short', day: 'numeric' }
      return new Date(this.dayKey).toLocaleString(language, options)
    },
    dayInPast () {
      return new Date().setDate(new Date().getDate() - 1) > new Date(this.dayKey)
    },
    today () {
      return new Date().toISOString().split('T')[0] === this.dayKey
    }
  },
  methods: {
    displayStringFirstCap (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    handleActionClick () {
      this.$router.push({ path: `/edit/${this.dayKey}` })
    }
  }
}
</script>

<style scoped>
.item {
  margin: 0.75rem;
  text-align: left;
  position: relative;
}

.item--past {
  background: rgba(0,0,0,0.03);
}

.item__header {
}

.item__today {
  height: 0.375rem;
  width: 0.375rem;
  margin: 0 0.25rem 0.2rem 0;
  background-color: #f56c6c;
  border-radius: 50%;
  display: inline-block;
  animation: pulse 1.5s cubic-bezier(.5, 0, 1, 1) infinite alternate;
}

@keyframes pulse {
  from { opacity: 1; }
  to { opacity: 0; }
}

.item__action {
  font-size: 1.25rem;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.5rem;
}

.item__item {
  display: flex;
  margin: 0.25rem 0;
}

.item__item-title {
  width: 5rem;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.item__item-body {
}
</style>

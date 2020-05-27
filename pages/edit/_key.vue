<template>
  <el-card class="item">
    <div v-for="(meal, mealKey) of dayCopy" :key="mealKey">
      <div>{{ displayStringFirstCap(mealKey) }}</div>
      <div class="item__input-rows">
        <div v-for="(item, index) of meal" :key="index" class="item__input-row">
          <el-input
            :ref="mealKey + index"
            v-model="dayCopy[mealKey][index]"
            type="textarea"
            autosize
            resize="none"
            placeholder="Please input"
            @change="update"
          />
          <div class="item__input-actions">
            <el-button size="small" icon="el-icon-delete" @click="deleteItem(mealKey, index)" />
          </div>
        </div>
        <el-button-group class="item__adds">
          <el-button size="small" icon="el-icon-plus" class="item__add" round @click="addItem(mealKey)" />
          <el-button size="small" icon="el-icon-search" class="item__add" round @click="searchItem(mealKey)" />
          <el-button size="small" icon="el-icon-magic-stick" class="item__add" round @click="addRandomItem(mealKey)" />
        </el-button-group>
      </div>
    </div>
    <div class="item__actions">
      <el-button size="small" type="primary" class="item__save" @click="close">
        Save
      </el-button>
    </div>
    <el-dialog v-if="dialogSearchMealType" title="Select a Meal" :visible.sync="dialogSearchVisible" :fullscreen="true">
      <el-table
        :data="suggestions[dialogSearchMealType].map(item => { const obj = {}; obj.key=item; return obj})"
        row-class-name="table__row"
        :stripe="true"
        @row-click="handleTableRowClick"
      >
        <el-table-column prop="key" />
      </el-table>
    </el-dialog>
  </el-card>
</template>

<script>
import rn from 'random-number-csprng'

export default {
  name: 'EditDay',
  data () {
    return {
      dayCopy: {},
      dialogSearchVisible: false,
      dialogSearchMealType: undefined
    }
  },
  computed: {
    dayKey () {
      return this.$route.params.key
    },
    day () {
      return this.$store.getters.day(this.dayKey)
    },
    suggestions () {
      return this.$store.getters.suggestions
    }
  },
  created () {
    this.$store.dispatch('activateClosableHeader')
    const matchesRegEx = this.dayKey.match(/^\d{4}-\d{2}-\d{2}$/g)
    const invalidDay = isNaN(new Date(this.dayKey).getTime())
    if (!matchesRegEx && invalidDay) {
      this.$router.replace({ path: '/' })
    }
    this.dayCopy = JSON.parse(JSON.stringify(this.day))
  },
  beforeDestroy () {
    this.$store.dispatch('deactivateClosableHeader')
  },
  methods: {
    displayStringFirstCap (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    addItem (mealKey) {
      this.dayCopy[mealKey].push('')
      const index = this.dayCopy[mealKey].length - 1
      setTimeout(() => {
        this.$refs[mealKey + index][0].focus()
      }, 0)
    },
    async addRandomItem (mealKey) {
      const sugLength = this.suggestions[mealKey].length
      if (sugLength < 1) {
        this.addItem(mealKey)
      } else {
        const randomNumber = sugLength === 1 ? 0 : await rn(0, sugLength - 1)
        this.dayCopy[mealKey].push(this.suggestions[mealKey][randomNumber])
        this.update()
      }
    },
    update () {
      const newDay = JSON.parse(JSON.stringify(this.dayCopy))
      for (const mealKey of Object.keys(newDay)) {
        let meal = newDay[mealKey]
        meal = meal.map(item => item.replace(/\s+/g, ' ').trim())
        newDay[mealKey] = meal.filter(item => item !== '')
      }
      this.$store.dispatch('saveDay', { day: newDay, dayKey: this.dayKey })
    },
    deleteItem (mealKey, index) {
      this.dayCopy[mealKey].splice(index, 1)
      this.update()
    },
    searchItem (mealKey) {
      this.dialogSearchMealType = mealKey
      this.dialogSearchVisible = true
    },
    handleTableRowClick (row) {
      this.dayCopy[this.dialogSearchMealType].push(row.key)
      this.dialogSearchVisible = false
      this.update()
    },
    close () {
      if (window.History.length > 0) {
        this.$router.replace('/')
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.item {
  margin: 4rem 0.75rem 0.75rem 0.75rem;
  text-align: left;
}

.item__input-rows {
  margin: 0.25rem 0 0.25rem 0.5rem ;
}

.item__input-row {
  display: flex;
  margin-bottom: 0.25rem;
}

.item__input-actions {
  margin-left: 0.5rem;
}

.item__adds {
  width: 100%;
}

.item__add {
  width: 33.333%;
}

.item__actions {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

.item__save {
  width: 50%;
}
</style>

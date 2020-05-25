<template>
  <header class="header">
    <h3>Meal Planner</h3>
    <i v-if="closable" class="el-icon-close header__close" @click="close" />
  </header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    closable () {
      return this.$store.getters.headerClosable
    }
  },
  methods: {
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
.header {
  background-color: #3E6990;
  color: white;
  padding: 1rem;
}

.header__close {
  cursor: pointer;
  font-size: 2rem;
  position: absolute;
  top: 0.65rem;
  right: 1rem;
  padding-left: 1rem;
}
</style>

<template>
  <header class="header">
    <h3>Meal Planner</h3>
    <div class="header__action">
      <i v-if="closable" class="el-icon-close header__action-item" @click="close" />
      <div v-if="!closable && !copying">
        <i class="el-icon-document-copy header__action-item" @click="copy" />
        <i class="el-icon-menu header__action-item" @click="toggleDrawer" />
      </div>
      <div v-if="copying && !closable">
        <i class="el-icon-check header__action-item" @click="paste" />
        <i class="el-icon-close header__action-item" @click="cancelCopy" />
      </div>
    </div>
    <el-drawer
      title="Menu"
      :visible.sync="drawer"
      direction="rtl"
      size="16rem"
      :append-to-body="true"
    >
      <DrawerBody @closeDrawer="toggleDrawer" />
    </el-drawer>
  </header>
</template>

<script>
import DrawerBody from './DrawerBody'

export default {
  name: 'Header',
  components: { DrawerBody },
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    closable () {
      return this.$store.getters.headerClosable
    },
    copying () {
      return this.$store.getters.toCopy.length > 0
    }
  },
  methods: {
    close () {
      if (window.History.length > 0) {
        this.$router.replace('/')
      } else {
        this.$router.push('/')
      }
    },
    copy () {
      this.$store.dispatch('startCopy')
    },
    cancelCopy () {
      this.$store.dispatch('resetCopy')
    },
    paste () {
      this.$store.dispatch('applyCopy')
    },
    toggleDrawer () {
      this.drawer = !this.drawer
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  background-color: #D66B24;
  color: white;
  padding: 1rem;
  width: 100%;
  top: 0;
  z-index: 100;
}

.header__action {
  font-size: 2rem;
  position: absolute;
  top: 0.65rem;
  right: 1rem;
}

.header__action-item {
  cursor: pointer;
  padding-left: 1rem;
}
</style>

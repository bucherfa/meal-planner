<template>
  <div class="drawer">
    <el-menu>
      <el-menu-item index="1" @click="backup">
        <i class="el-icon-box" />
        <span>Backup</span>
      </el-menu-item>
      <el-menu-item index="2" @click="restoreConfirm">
        <i class="el-icon-document-add" />
        <span>Restore</span>
      </el-menu-item>
      <el-menu-item index="3" @click="resetConfirm">
        <i class="el-icon-folder-delete" />
        <span>Reset</span>
      </el-menu-item>
    </el-menu>
    <el-divider />
    <div class="drawer__item drawer__item--meta">
      <a :href="homepage" type="primary">{{ name }}</a>
      on Github
    </div>
    <div class="drawer__item drawer__item--meta">
      Version: {{ version }}
    </div>
    <el-dialog
      title="Warning"
      :visible.sync="resetConfirmDialog"
      width="20rem"
      :append-to-body="true"
      :center="true"
    >
      <div class="dialog__body">
        <div>
          By resetting you will loose all data. Consider backing up first.
        </div>
        <div>Are you sure you want to reset the app?</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="backup">Backup</el-button>
        <el-button @click="resetConfirmDialog = false">No</el-button>
        <el-button type="danger" @click="reset">Yes</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="Warning"
      :visible.sync="restoreConfirmDialog"
      width="20rem"
      :append-to-body="true"
      :center="true"
    >
      <div class="dialog__body">
        <div>
          By restoring you will overwrite all data.
        </div>
      </div>
      <span slot="footer">
        <el-button @click="restoreConfirmDialog = false">Cancel</el-button>
        <el-button type="primary" @click="restore">Restore</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import packageJSON from '../package.json'

export default {
  name: 'DrawerBody',
  data () {
    return {
      version: packageJSON.version,
      name: packageJSON.name,
      homepage: packageJSON.homepage,
      resetConfirmDialog: false,
      restoreConfirmDialog: false
    }
  },
  computed: {
    data () {
      return this.$store.getters.data
    }
  },
  methods: {
    backup () {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ data: this.data }))
      const downloadElement = document.createElement('a')
      downloadElement.setAttribute('href', dataStr)
      const backupName = 'Backup_' + new Date().toISOString().split('T')[0] + '.MealPlanner'
      downloadElement.setAttribute('download', backupName)
      downloadElement.click()
      downloadElement.remove()
      this.$notify({
        title: 'Success',
        message: 'Backup created successfully.',
        type: 'success',
        position: 'top-left'
      })
      this.$emit('closeDrawer')
    },
    resetConfirm () {
      this.resetConfirmDialog = true
    },
    reset () {
      this.$store.dispatch('resetData')
      this.$notify({
        title: 'Success',
        message: 'Successfully reset app.',
        type: 'success',
        position: 'top-left'
      })
      this.$emit('closeDrawer')
      this.resetConfirmDialog = false
    },
    restoreConfirm () {
      this.restoreConfirmDialog = true
    },
    restore () {
      const uploadElement = document.createElement('input')
      uploadElement.setAttribute('type', 'file')
      uploadElement.setAttribute('accept', '.MealPlanner')
      uploadElement.setAttribute('multiple', 'false')
      uploadElement.click()
      uploadElement.addEventListener('change', () => {
        const file = uploadElement.files[0]
        if (file !== undefined) {
          const fr = new FileReader()
          fr.onload = () => {
            try {
              const result = JSON.parse(fr.result)
              if (!result.data) {
                throw new Error('Restore: No data attribute available.')
              }
              this.$store.dispatch('setData', result.data)
              this.$emit('closeDrawer')
              this.$notify({
                title: 'Success',
                message: 'Successfully restored.',
                type: 'success',
                position: 'top-left'
              })
            } catch (e) {
              // eslint-disable-next-line no-console
              console.log(e)
              this.$notify({
                title: 'Error',
                message: 'Restore failed. Corrupt backup.',
                type: 'error',
                position: 'top-left'
              })
            }
            this.restoreConfirmDialog = false
          }
          fr.readAsText(file)
        }
        uploadElement.remove()
      })
    }
  }
}
</script>

<style scoped>
.drawer {
  color: #303133;
}

.drawer__item {
  padding: 0 0.5rem;
}

.drawer__item--meta {
  font-size: 0.8rem;
  padding: 0 1.6rem;
}

.dialog__body {
  word-break: break-word;
}
</style>

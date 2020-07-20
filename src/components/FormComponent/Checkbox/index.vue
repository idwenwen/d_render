<template>
  <el-checkbox-group v-model="selected">
    <div
      v-for="(item, index) in options"
      :key="index"
    >
      <el-checkbox
        :label="item.value"
        :disabled="disableSet[item.value]"
      >
        {{ item.label }}
      </el-checkbox>
      <div
        v-if="item.children"
      >
        <groups
          :ref="item.value + 'group'"
          :form="item.children.form"
          :name="item.value"
          :class-name="item.children.className"
          :def="def"
          :to-array="true"
          :disabled="groupDisable(item.value)"
          @change="groupChange"
        />
      </div>
    </div>
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'Checkbox',
  components: {
    groups: () => import('../Group')
  },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    def: {
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() { 
    return {
      selected: [],
      result: {},
      disableSet: {},
      canSend: false
    }
  },
  watch: {
    selected: {
      handler() {
        this.disablePart()
        this.change()
      },
      deep: true
    },
    disableSet: {
      handler() {
        this.disablePart()
      },
      deep: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      for (const val of this.options) {
        this.disableSet[val.value] = this.disabled
      }
      if (this.def) {
        this.selected = []
        this.selected.push(this.options[0].value)
      }
    },

    groupChange(res, name) {
      this.result[name] = res
      this.change()
    },

    getProperty() {
      const list = JSON.parse(JSON.stringify(this.selected))
      for (let i = 0 ; i < list.length; i++) {
        const val = this.result[list[i]]
        if (val) {
          list.splice(i, 1)
          if (Array.isArray(val)) {
            list.splice(i, 0, ...val)
          } else {
            list.splice(i, 0, val)
          }
        }
      }
      return list
    },
    
    disablePart() {
      for (const val of this.options) {
        if (this.selected.indexOf(val.value) < 0 || this.disableSet[val.value]) {
          if (this.$refs[val.value + 'group'] && this.$refs[val.value + 'group'][0].disable) {
            this.$refs[val.value + 'group'][0].disable()
          }
        } else {
          if (this.$refs[val.value + 'group'] && this.$refs[val.value + 'group'][0].able) {
            this.$refs[val.value + 'group'][0].able()
          }
        }
      }
    },

    groupDisable(val) {
      return this.selected.indexOf(val) < 0
    },

    change() {
      if (!this.canSend) {
        let canSend = true
        for (const val of this.options) {
          if (val.children && !this.result[val.value]) {
            canSend = false
            break
          }
        }
        this.canSend = canSend
      }
      if (this.canSend) {
        const list = this.getProperty()
        this.$emit('change', list, this.name)
      }
    },
    confirm() {
      return this.getProperty()
    },
    reset() {
      this.selected = [this.options[0]]
    },
    disable() {
      for (const val of this.options) {
        this.disableSet[val.value] = true
      }
    },
    able() {
      for (const val of this.options) {
        this.disableSet[val.value] = false
      }
    }
  }
}
</script>

<style lang="" scoped>

</style>
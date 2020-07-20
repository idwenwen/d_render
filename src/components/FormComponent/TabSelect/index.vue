<template>
  <section
    :class="className"
    class="tab-select__container"
  >
    <slot name="begin" />
    <cselect
      v-model="selected"
      :options="selectOptions"
      :def="true"
      :disabled="disableSet"
      :multiple="multiple"
    />
    <slot name="middle" />
    <group
      v-for="(item, index) in currentGroup"
      :ref="'group'"
      :key="index"
      :form="item.form.form"
      :name="item.name"
      :class-name="item.form.className"
      :def="def"
      @change="groupChange"
    />
    <slot name="end" />
  </section>
</template>

<script>
export default {
  name: 'TabSelect',
  components: {
    cselect: () => import('../Select'),
    group: () => import('../group')
  },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    def: {
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() { 
    return {
      selected: '',
      result: '',
      groups: {},
      disableSet: this.disabled,
      currentGroup: ''
    }
  },
  computed: {
    selectOptions() {
      const res = []
      for (const val of this.options) {
        res.push({
          label: val.label,
          value: val.value
        })
      }
      return res
    },
  },
  watch: {
    selected() {
      const list = Array.isArray(this.selected) ? this.selected : [this.selected]
      const res = []
      for (const val of list) {
        for (const item of this.options) {
          if (val === item.value) {
            res.pusn({
              name: item.value,
              form: item.children
            })
            break
          }
        }
      }
      this.currentGroup = res
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.selected = this.options[0].value
    },
    groupChange(name, param) {
      this.groups[name] = param
      this.change()
    },
    getProperty() {
      const list = Array.isArray(this.selected) ? this.selected : [this.selected]
      for (let i = 0 ; i < list.length; i++) {
        if (this.groups[list[i]]) {
          list.splice(i, 1, this.groups[list[i]])
        }
      }
      return list
    },
    change() {
      const res = this.getProperty()
      if (this.$listeners['input']) {
        this.$emit('input', res)
      }
      this.$emit('change', res)
    },
    reset() {
      this.selected = ''
      for (let i = 0; i < this.groups.length; i++) {
        if (this.$refs['group' + i].reset) {
          this.$refs['group' + i].reset()
        }
      }
    },
    confirm() {
      return this.getProperty()
    },
    disable(){
      this.disableSet = true
      for (let i = 0; i < this.groups.length; i++) {
        if (this.$refs['group' + i].disable) {
          this.$refs['group' + i].disable()
        }
      }
    },
    able() {
      this.disableSet = false
      for (let i = 0; i < this.groups.length; i++) {
        if (this.$refs['group' + i].able) {
          this.$refs['group' + i].able()
        }
      }
    }
  }
}
</script>

<style lang="" scoped>

</style>
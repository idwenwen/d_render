<template>
  <section>
    <el-checkbox-group
      v-if="Array.isArray(options)"
      v-model="selected"
    >
      <c-box
        v-for="(item, index) in options"
        :key="index"
        :ref="item.value"
        :label="item.label"
        :value="item.value"
        :group="item.group || {}"
        @change="boxChange(item.value)"
        @form="boxForm(item.value)"
        @search="boxSearch"
      />
    </el-checkbox-group>
    <c-box
      v-else
      :ref="options.value"
      :label="options.label"
      :value="options.value"
      :group="options.group || {}"
      @change="boxChange(options.value)"
      @form="boxForm(options.value)"
      @search="boxSearch"
    />
  </section>
</template>

<script>
import basicOperation from '@/mixin/BasicOperation'
export default {
  name: 'CusCheckbox',
  components: {
    cBox: () => import('./CheckboxSingle')
  },
  mixins: [
    basicOperation
  ],
  props: {
    options: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Array | Object,
      default: () => []
    },
    disabled: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Boolean | Array,
      default: false
    }
  },
  data() { 
    return {
      propResult: {},
      formResult: {},
      selected: [],
      canSend: false
    }
  },
  watch: {
    propResult: {
      handler() {
        this.change()
      },
      deep: true
    },
    formResult: {
      handler() {
        this.confirm()
      },
      deep: true
    }
  },
  methods: {
    boxChange(label) {
      return (res) => {
        debugger
        this.$set(this.propResult, label, res)
      }
    },
    boxForm(label) {
      return (res) => {
        this.$set(this.formResult, label, res)
      }
    },
    boxSearch(res) {
      this.$emit('search', res)
    },
    change() {
      if (!this.canSend) {
        let canSend = true
        if (Array.isArray(this.options)) {
          for (const val of this.options) {
            if (!this.propResult[val.value]) {
              canSend = false
              break
            }
          }
        } else {
          if (!this.propResult[this.options.value]) {
            canSend = false
          }
        }
        this.canSend = canSend
      }
      if (this.canSend) {
        const getProperty = () => {
          const res = []
          for(const key in this.filterBySelect(this.propResult)) {
            const val = this.propResult[key]
            if (Array.isArray(val)) {
              res.push(...val)
            } else {
              res.push(val)
            }
          }
          return res
        }
        this.$emit('change', getProperty())
      }
    },
    confirm() {
      this.$emit('form', {
        select: this.selected,
        value: this.filterBySelect(this.formResult)
      })
    },
    filterBySelect(obj) {
      const res = {}
      for (const val of this.selected) {
        res[val] = obj[val]
      }
      return res
    },
    disable() {
      const list = this.toArr(this.options)
      for (const val of list) {
        this.refOpera(val.value, 'disable')
      }
    },
    able() {
      const list = this.toArr(this.options)
      for (const val of list) {
        this.refOpera(val.value, 'able')
      }
    },
    getParam() {
      return this.formResult
    },
    setDefault() {
      const list = this.toArr(this.options)
      this.selected = Array.isArray(this.options) ? [this.options[0].value] : []
      for (const val of list) {
        this.refOpera(val.value, 'setDefault')
        if (this.selected.indexOf(val.value) >= 0) {
          this.refOpera(val.value, 'choosedChange')
        } else {
          this.refOpera(val.value, 'boxDisable')
        }
      }
    }
  }
 }
</script>

<style lang="" scoped>

</style>
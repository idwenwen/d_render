<template>
  <section class="filter__container">
    <c-select
      v-if="others.length > 0"
      ref="cusSelect"
      :options="others"
      :multiple="multiple"
      @change="selectChange"
      @form="selectForm"
    />
    <component
      :is="multiple ? 'cCheckbox' : 'cRadio'"
      v-if="boxes.length > 0"
      ref="cusBox" 
      :options="boxes"
      @form="boxForm"
      @change="boxChange"
      @search="boxSearch"
    />
  </section>
</template>

<script>
import dataFilter from '@/mixin/DataFilters'
import basicOperation from '@/mixin/BasicOperation'
export default {
  name: 'FilterSelection',
  components: {
    cSelect: () => import('../Select'),
    cCheckbox: () => import('../Checkbox'),
    cRadio: () => import('../Radio')
  },
  mixins: [
    dataFilter,
    basicOperation
  ],
  props: {
    options: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default:false
    }
  },
  data() { 
    return {
      boxes: [],
      others: [],

      formResult: {},
      canSend: false,

      midPropResult: [],
      propResult: [],

      levels: 1
    }
  },
  watch: {
    midPropResult() {
      this.refOpera('cusSelect', 'setProperty')
    },
    propResult() {
      this.change(this.propResult)
    },
    formResult() {
      this.confirm()
    }
  },
  created() {
    this.getBox()
  },
  methods: {
    getBox() {
      const res = []
      const otherSelection = {}
      let levels = 1
      for (const val of this.options) {
        if (Array.isArray(val.value) && Array.isArray(val.value[0].value)) {
          levels = 3
        } else if (Array.isArray(val.value)) {
          levels = 2 > levels ? 2 : levels
        }
      }
      this.levels = levels
      if (levels > 1) {
        for (const val of this.options) {
          if (Array.isArray(val.value) && Array.isArray(val.value[0].value)) {
            const secondSelect = []
            for (const item of val.value) {
              secondSelect.push({
                label: item.label,
                value: item.label
              })
              otherSelection[item.label] = item.value
            }
            res.push({
              label: val.label,
              value: val.label,
              group: {
                form: [
                  {
                    type: 'f-select',
                    props: {
                      options: secondSelect,
                      multiple: this.multiple
                    }
                  }
                ]
              }
            })
          } else if (Array.isArray(val.value) && !Array.isArray(val.value[0].value)) {
            if (levels === 3) {
              otherSelection[val.label] = val.value
              res.push({
                label: val.label,
                value: val.label
              })
            } else {
              res.push({
                label: val.label,
                value: val.label,
                group: {
                  form: [
                    {
                      type: 'f-select',
                      props: {
                        options: val.value,
                        multiple: this.multiple
                      }
                    }
                  ]
                }
              })
            }
          } else {
            res.push({
              label: val.label,
              value: val.value
            })
          }
        }
        this.boxes = res
        this.others = otherSelection
      } else {
        this.others = this.options
      }
    },
    boxForm(res) {
      this.formResult = Object.assign({}, this.formResult, res)
    },
    boxChange(res) {
      if (this.others.length === 0) {
        this.formResult = res
      } else {
        this.midPropResult = res
      }
    },
    boxSearch(res) {
      this.$emit('search', res)
    },
    selectChange(res) {
      this.propResult = res
    },
    selectForm(res) {
      this.formResult = Object.assign({}, this.formResult, {
        final: res
      })
    },
    confirm() {
      if (!this.canSend) {
        if (this.levels > 1) {
          if (Object.keys(this.formResult).length >= (this.others.length > 0 ? 3 : 2)) {
            this.canSend = true
          }
        } else {
          if (this.formResult.final) this.canSend = true
        }
      }
      if (this.canSend) {
        this.$emit('form', this.formResult)
      }
    },
    getParam() {
      if (!this.canSend) {
        if (Object.keys(this.formResult).length >= (this.others.length > 0 ? 3 : 2)) {
          this.canSend = true
        }
      }
      if (this.canSend) {
        return this.formResult  
      }
      return {}
    },
    disable() {
      this.refOpera('cusSelect', 'disable')
      this.refOpera('cusBox', 'disable')
    },
    able() {
      this.refOpera('cusSelect', 'able')
      this.refOpera('cusBox', 'able')
    },
    setDefault() {
      this.refOpera('cusBox', 'setDefault')
      this.refOpera('cusSelect', 'setDefault')
    }
  }
 }
</script>

<style lang="" scoped>

</style>
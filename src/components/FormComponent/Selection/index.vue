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
      v-if="boxes"
      ref="cusBox"
      :is="(multiple ? 'cCheckbox' : 'cRadio')"
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
  mixins: [dataFilter, basicOperation],
  props: {
    options: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      boxes: '',
      others: '',

      formResult: {},

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
          levels = levels < 2 ? 2 : levels
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
          } else if (
            Array.isArray(val.value) &&
						!Array.isArray(val.value[0].value)
          ) {
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
      if (!Array.isArray(this.others) || this.others.length === 0) {
        this.propResult = res
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
      this.$emit('form', this.formResult)
    },
    getParam() {
      return this.formResult
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

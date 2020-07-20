<template>
  <groups
    :form="groupBox"
    :def="true"
    @change="groupChange"
  />
</template>

<script>
export default {
  name: 'FilterSelect',
  components: {
    groups: () => import('../Group')
  },
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
      boxes: [],
      others: [],
      needThree: false
    }
  },
  computed: {
    groupBox() {
      const res = [
        {
          type: this.multiple ? 'checkbox' : 'radio',
          props: {
            options: this.boxes,
          },
          name: 'filterBox'
        }
      ]
      if (Object.keys(this.others).length > 0) {
        res.unshift({
          type: 'select',
          props: {
            options: this.others
          },
          name: 'selection'
        })
        res[1].connectTo = [0]
      }
      return res
    }
  },
  watch: {
    options: {
      handler() {
        this.getBox()
      },
      deep: true
    }
  },
  created() {
    this.getBox()
  },
  methods: {
    getBox() {
      const res = []
      const otherSelection = {}
      let needThree = false
      for (const val of this.options) {
        if (Array.isArray(val.value) && Array.isArray(val.value[0].value)) {
          needThree = true
          break 
        }
      }
      this.needThree = needThree
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
            children: {
              form: [
                {
                  type: 'select',
                  props: {
                    options: secondSelect,
                    multiple: this.multiple
                  }
                }
              ]
            }
          })
        } else if (Array.isArray(val.value) && !Array.isArray(val.value[0].value)) {
          if (needThree) {
            otherSelection[val.label] = val.value
            res.push({
              label: val.label,
              value: val.label
            })
          } else {
            res.push({
              label: val.label,
              value: val.label,
              children: {
                form: [
                  {
                    type: 'select',
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
    },
    getProperty(attrs) {
      if (this.needThree) {
        return attrs['selection']
      } else {
        return attrs['filterBox']
      }
    },
    groupChange(properties) {
      this.$emit('change', this.getProperty(properties))
    }
  }
}
</script>

<style lang="" scoped>

</style>
<template>
  <cgroup
    :options="currentGroup"
  />
</template>

<script>
import dataFilter from '@/mixin/DataFilters'
export default {
  name: 'CustomCharts',
  components: {
    cgroup: () => import('../../ComponentGroup')
  },
  mixins: [
    dataFilter
  ],
  props: {
    setting: {
      type: Object,
      default: () => {}
    },
    options: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Object | Array,
      default: () => {}
    },
    group: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'line'
    },
    legend: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    zoom: {
      type: Boolean,
      default: false
    }
  },
  data() { 
    return {
      allOptions: Array.isArray(this.options) ? [...this.options] : Object.assign({}, this.options)
    }
  },
  computed: {
    currentOptions() {
      if (!this.property && !Array.isArray(this.allOptions)) {
        return {}
      }
      const series = Array.isArray(this.allOptions)
        ? Object.assign({}, this.setting, {
          series: this.allOptions
        })
        : this.propfilter(this.allOptions)
      const setting = JSON.parse(JSON.stringify(this.setting))
      if (!this.legend || this.legend === 'custom') {
        delete setting.legend
      }
      return Object.assign({}, setting, {
        series
      })
    },
    currentLegend() {
      const chooseRes = []
      if (this.group.length > 0) {
        for (const item of this.group) {
          chooseRes.push({
            group: item,
            items: []
          })
        }
      }
      const series = this.currentOptions.series
      for (const val of series) {
        if (val.type === this.type) {
          if (this.group.length > 0) {
            for (const group of chooseRes) {
              if (val.name.match(group.group)) {
                group.item.push({
                  label: val.name,
                  value: val.name
                })
              }
            }
          } else {
            chooseRes.push({
              label: val.name,
              value: val.name
            })
          }
        }
      }
      return chooseRes
    },
    currentGroup() {
      const options = []
      const tableSetting = Object.assign({}, this.currentOptions)
      if (this.legend === 'custom') {
        options.push(this.setCusLegend())
      } else if (this.legend && !tableSetting.legend) {
        this.setLegend(tableSetting)
      }
      options.push({
        type: 'echart',
        props: {
          options: tableSetting,
          zoom: this.zoom
        }
      })
      return options
    }
  },
  watch: {
    options: {
      handler() {
        this.allOptions = Array.isArray(this.options) ? [...this.options] : Object.assign({}, this.options)
      },
      deep: true
    }
  },
  methods: {
    setLegend(tableSetting) {
      const res = []
      for (const val of tableSetting.series) {
        res.push(val.name)
      }
      tableSetting.legend = { data: res }
      return tableSetting
    },

    setCusLegend() {
      return {
          type: 'form',
          props: {
            list: [{
              type: 'legend',
              props: {
                choose: this.currentLegend
              }
            }]
          }
        }
    }
  },
 }
</script>

<style lang="" scoped>

</style>
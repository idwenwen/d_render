<template>
  <cgroup
    :options="currentGroup"
    class="chart__container"
  />
</template>

<script>
import dataFilter from '@/mixin/DataFilters'
export default {
  name: 'CustomCharts',
  components: {
    cgroup: () => import('../../ComponentGroup')
  },
  mixins: [dataFilter],
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
      allOptions: Array.isArray(this.options)
        ? [...this.options]
        : Object.assign({}, this.options)
    }
  },
  computed: {
    currentOptions() {
      if (!this.property && !Array.isArray(this.allOptions)) {
        return {}
      }
      const series = Array.isArray(this.allOptions)
        ? this.allOptions
        : this.propfilter(this.allOptions)
      let setting = JSON.parse(JSON.stringify(this.setting))
      if (setting[this.property]) {
        setting = setting[this.property]
      }
      if (!this.legend || this.legend === 'custom') {
        delete setting.legend
      }
      return Object.assign({}, setting, series.length > 0 ? {
        series
      }: {})
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
      const series = this.currentOptions.series || []
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
        const mid = this.setCusLegend()
        if (mid) {
          options.push(mid)
        }
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
        this.allOptions = Array.isArray(this.options)
          ? [...this.options]
          : Object.assign({}, this.options)
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
      return this.currentLegend.length > 0 ? {
        type: 'form',
        props: {
          form: [
            {
              type: 'legend',
              name: 'legend',
              props: {
                choose: this.currentLegend
              }
            }
          ]
        }
      } : null
    },
    setProperty(param) {
      this.property = Array.isArray(param) ? param[0] : param
    }
  }
}
</script>

<style lang="" scoped>
</style>

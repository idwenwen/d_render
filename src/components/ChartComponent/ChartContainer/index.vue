<template>
  <div
    v-loading="loading"
    class="cus-chart__container"
  >
    <cus-legend
      v-if="legend === 'custom'"
      :choose="chooses()"
      @update="legendUpdate"
    />
    <instance
      ref="chart"
      :option="setting"
    />
  </div>
</template>

<script>
export default {
  name: 'CusCharts',
  components: {
    instance: () => import('../EchartsInstance'),
    cusLegend: () => import('../CustomLegend')
  },
  props: {
    option: {
      type: Object,
      default: () => {}
    },
    group: {
      type: Number,
      default: 1
    },
    name: {
      type: String,
      default: ''
    },
    async: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Object | Boolean,
      default: false
    },
    legend: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Boolean,
      default: 'normal'
    },
    zoom: {
      type: Boolean,
      default: false
    }
  },
  data() { 
    return {
      setting: {}, // 当前chart设置
      loading: true
    }
  },
  computed: {
    chooses() {
      const choose = []
      let group = []
      if (this.option.series.legnth > 0) {
        for (const val of this.option.series) {
          group.push(val.name)
          if (group.length >= this.group) {
            if(group.length === 1) {
              choose.push(...group)
            } else {
              choose.push(group)
            }
          }
        }
      }
      return choose
    }
  },
  watch: {
    option: {
      handler() {
        this.init()
      },
      deep: true
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.option.series) {
        let setting = JSON.parse(JSON.stringify(this.option))
        setting = this.legendCheck(setting)
        if (this.legend === 'custom' || !this.legend) {
          setting.series = []
        }
        this.setting = setting
      } else if (this.async) {
        this.request()
      }
    },
    hideLegend(option) {
      if (option.legend) {
        option.legend.show = false
      }
      return option
    },
    setLegend(option) {
      if (!option.legend) {
        const data = []
        for (const val of option.series) {
          data.push(val.name)
        }
        option.legend = {
          data
        }
      }
      return option
    },
    legendCheck(setting) {
      if ((this.legend === 'custom' || !this.legend) && setting.legend) {
        setting = this.hideLegend(setting)
      } else if ((this.legend === 'normal' || this.legend) && !setting.legend) {
        setting = this.setLegend(setting)
      }
      return setting
    },
    legendUpdate(property) {
      const finalSeries = []
      for (const val of this.option.series) {
        if (property[val.name]) {
          const res = JSON.props(JSON.stringify(val))
          res.lineStyle = res.lineStyle || {}
          res.lineStyle.color = property[val.name]
          finalSeries.push(res)
        }
      }
      this.setting.series = finalSeries
    },
    request() {
      this.$emit('request', this.async, { name: this.name })
    },
    refresh() {
      this.$emit('refresh', this.async, { name: this.name })
    },
    getOption() {
      return this.setting
    },
    setOption(value) {
      this.setting = value
    },
    getInstance() {
      this.$refs['chart'].getInstance()
    },
    resize() {
      this.$refs['chart'].resize()
    }
  }
 }
</script>

<style lang="" scoped>

</style>
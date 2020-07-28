<template>
  <div ref="myChart" class="charts_container" />
</template>

<script>
import echarts from 'echarts'
export default {
  name: '',
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      instance: '',
      currentOptions: {},
      currentFilter: ''
    }
  },
  watch: {
    options: {
      handler() {
        this.linkageForm(this.currentFilter)
      },
      deep: true
    },
    currentOptions: {
      handler() {
        Promise.resolve(this.refresh()).then(() => {
          this.resize()
        })
      }
    }
  },
  mounted() {
    this.echartInit()
    this.linkageForm(this.currentFilter)
  },
  methods: {
    echartInit() {
      this.instance = echarts.init(this.$refs['myChart'])
    },
    refresh() {
      if (
        this.currentOptions.series &&
				Object.keys(this.currentOptions.series).length !== 0
      ) {
        this.instance.setOption(this.currentOptions, true)
      }
    },
    resize() {
      this.instance.resize()
    },
    getInstance() {
      return this.instance
    },
    linkageForm(res) {
      const opts = JSON.parse(JSON.stringify(this.options))
      if (res) {
        this.currentFilter = res
        for (let i = 0; i < opts.series.length; i++) {
          const val = opts.series[i]
          let has = false
          for (const item of this.currentFilter.legend) {
            if (val.name.match(item.group.name)) {
              has = true
              let initems = false
              for (const it of item.items) {
                if (val.name === it.value) {
                  initems = true
                  val.itemStyle = val.itemStyle || {}
                  val.itemStyle.color = it.color
                  break
                }
              }
              if (!initems) {
                val.itemStyle = val.itemStyle || {}
                val.itemStyle.color = item.group.color[0]
              } else {
                break
              }
            }
          }
          if (!has) {
            opts.series.splice(i, 1)
            i--
          }
        }
      }
      this.currentOptions = opts
    }
  }
}
</script>

<style lang="scss" scoped>
.charts_container {
	min-height: 300px;
}
</style>

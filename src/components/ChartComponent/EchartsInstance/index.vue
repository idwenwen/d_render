<template>
  <div
    ref="chart"
    class="charts_container"
  />
</template>

<script>
import echarts from 'echarts'
export default {
  name: '',
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  data() { 
    return {
      instance: ''
    }
  },
  watch: {
    option: {
      handler() {
        this.refresh()
        this.resize()
      },
      deep: true
    }
  },
  beforeMount() {
    this.echartInit()
  },
  mounted() {
    this.refresh()
  },
  methods: {
    echartInit() {
      this.instance = echarts.init(this.$refs.chart)
    },
    refresh() {
      if (this.option.series && Object.keys(this.option.series).length !== 0) {
        this.instance.setOption(this.option)
      }
    },
    resize() {
      this.instance.resize()
    },
    getInstance() {
      return this.instance
    }
  }
}
</script>

<style lang="" scoped>

</style>
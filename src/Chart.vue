<template>
  <div>
    <cchart
      ref="setting"
      :setting="setting"
      :options="series"
      :legend="'custom'"
    />
    <el-button @click="change">
      change
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'CustomChart',
  components: {
    cchart: () => import('./components/ChartComponent/ChartContainer')
  },
  data() {
    return {
      current: '',
      setting: {
        check1: {
          title: {
            text: '折线图堆叠1'
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value'
          }
        },
        check2: {
          title: {
            text: '折线图堆叠2'
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['一', '二', '三', '四', '五', '六', '日']
          },
          yAxis: {
            type: 'value'
          }
        }
      },
      series: {
        check1: [
          {
            name: 'iteration_0',
            type: 'line',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'iteration_1',
            type: 'line',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'iteration_2',
            type: 'line',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'iteration_3',
            type: 'line',
            data: [320, 332, 301, 334, 390, 330, 320]
          },        
          {
            name: 'iteration_4',
            type: 'line',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ],
        check2: [
          {
            name: 'iteration_0',
            type: 'line',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'iteration_1',
            type: 'line',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'iteration_2',
            type: 'line',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'iteration_4',
            type: 'line',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    }
  },
  methods: {
    change() {
      if (!this.current || this.current === 'check2')
        this.current = 'check1'
      else this.current = 'check2'
      this.$refs['setting'].setProperty(this.current)
    }
  }
}
</script>

<style lang="" scoped>
</style>

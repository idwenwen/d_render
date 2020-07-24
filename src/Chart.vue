<template>
  <cchart
    :setting="setting"
    :options="series"
  />
</template>

<script>
export default {
  name: 'CustomChart',
  components: {
    cchart: () => import('./components/ChartComponent/ChartContainer')
  },
  data() { 
    return {
      setting: {
            title: {
              text: '折线图堆叠'
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
      series: [{
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
              }]
    }
  }
 }
</script>

<style lang="" scoped>

</style>
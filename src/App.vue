<template>
  <div>
    <!-- <c-table :header="table.props.header" :data="table.props.data.guest" /> -->
    <!-- <c-group :options="[dataes, table]" /> -->
    <div id="app">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    // groups: () => import('./components/FormComponent/Group'),
    // cTable: () => import('./components/TableComponent/PaginationTable'),
    // cGroup: () => import('./components/ComponentGroup')
  },
  data() {
    return {
      dataes: {
        type: 'form',
        props: {
          form: [
            {
              type: 'title',
              props: {
                title: 'Testing Form'
              }
            },
            {
              type: 'filterSelect',
              name: 'tableSelection',
              props: {
                options: [
                  {
                    label: 'guest',
                    value: 'guest'
                  },
                  {
                    label: 'host',
                    value: [
                      {
                        label: '1000',
                        value: '1000'
                      },
                      {
                        label: '999',
                        value: '999'
                      }
                    ]
                  }
                ]
              }
            },
            {
              type: 'text',
              props: {
                content: 'this is total for {t}',
                data: {
                  '{t}': 'testing'
                }
              }
            },
            {
              type: 'input',
              name: 'textInput',
              props: {}
            },
            {
              type: 'search'
            }
          ],
          toProperty: 'tableSelection'
        }
      },
      table: {
        type: 'table',
        props: {
          data: [
            { woe: 1.5023, iv: 1.25234, variable: 'x0' },
            { woe: 1.5023, iv: 1.25234, variable: 'x1' },
            { woe: 1.5023, iv: 1.25234, variable: 'x2' },
            { woe: 1.5023, iv: 1.25234, variable: 'x3' },
            { woe: 1.5023, iv: 1.25234, variable: 'x4' },
            { woe: 1.5023, iv: 1.25234, variable: 'x5' },
            { woe: 1.5023, iv: 1.25234, variable: 'x6' },
            { woe: 1.5023, iv: 1.25234, variable: 'x7' },
            { woe: 1.5023, iv: 1.25234, variable: 'x9' },
            { woe: 1.5023, iv: 1.25234, variable: 'x10' },
            { woe: 1.5023, iv: 1.25234, variable: 'x11' },
            { woe: 1.5023, iv: 1.25234, variable: 'x12' },
            { woe: 1.5023, iv: 1.25234, variable: 'x13' }
          ],
          header: [
            {
              label: 'variable',
              prop: 'variable'
            },
            {
              label: 'woe',
              prop: 'woe'
            },
            {
              label: 'iv',
              prop: 'iv'
            }
          ]
        }
      },
      charts: {
        type: 'chart',
        prop: {
          options: {
            title: {
              text: '折线图堆叠'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
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
            },
            series: [
              {
                name: '邮件营销',
                type: 'line',
                stack: '总量',
                data: [120, 132, 101, 134, 90, 230, 210]
              },
              {
                name: '联盟广告',
                type: 'line',
                stack: '总量',
                data: [220, 182, 191, 234, 290, 330, 310]
              },
              {
                name: '视频广告',
                type: 'line',
                stack: '总量',
                data: [150, 232, 201, 154, 190, 330, 410]
              },
              {
                name: '直接访问',
                type: 'line',
                stack: '总量',
                data: [320, 332, 301, 334, 390, 330, 320]
              },
              {
                name: '搜索引擎',
                type: 'line',
                stack: '总量',
                data: [820, 932, 901, 934, 1290, 1330, 1320]
              }
            ]
          }
        }
      }
    }
  },
  methods: {
    change() {
      this.checkboxGroupIt.push('guest')
    },
    consoles(value) {
      console.log(JSON.stringify(value))
    }
  }
}
</script>

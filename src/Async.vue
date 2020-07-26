<template>
  <cgroup
    :options="groupOptions"
  />
</template>

<script>
export default {
  name: "AsyncTesting",
  components: {
    cgroup: () => import('./components/ComponentGroup')
  },
  data () {
    return {
      form: [
        {
          type: 'text',
          name: 'testText',
          props: {
            content: 'Performance like below',
            hidden: true
          }
        },
        {
        type: 'f-select',
        props: {
          options: [
            {
              label: 'btn1',
              value: 't1'
            },
            {
              label: 'btn2',
              value: 't2'
            }
          ]
        }
      }],
      asyncParam:{
        options: [{
          name: 't1',
          props: {
            type: 't1'
          },
          method: this.requests,
          transform: (value) => {return value}
        }, {
          name: 't2',
          props: {
            type: 't2'
          },
          method: this.requests,
          transform: (value) => {return value}
        }],
        afterRequestForParent: this.afterRequestForParent
      },

      t1: {
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
        options: [{
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
      },
      t2: {
        header:[
          {
            type: 'index',
            label: 'index'
          },
          {
            label: 'variable',
            prop: 'variable'
          },
          {
            label: 'iv',
            prop: 'iv',
            sortable: true
          },
          {
            label: 'woe',
            prop: 'woe'
          }
        ],
        data: []
      }
    };
  },
  computed: {
    groupOptions() {
      return [
        {
          type: 'form',
          name: 'form',
          props: {
            form: this.form
          }
        },
        {
          type: 'async',
          props: this.asyncParam
        }
      ]
    }
  }, 
  created() {
    this.t2.data = this.initData(15)
  },
  methods: {
    initData(val) {
      const res = []
      for (let i = 0; i < val; i++) {
        res.push({
          variable: 'x' + i,
          woe: Math.random() * 1000,
          iv: Math.random() * 100,
          weight: 10 * i,
          operation: 'check | testClick',
          notes: 'checking' + i,
          sum: Math.random() * 100,
          tpr: Math.random() * 100,
          fpr: Math.random() * 100
        })
      }
      return res
    },
    requests(param) {
      const type = param.type
      return new Promise((resolve) => {
        setTimeout(() => {
          const res = {}
          if (type === 't1') {
            res.type = 'chart',
            res.props = this.t1
          } else {
            res.type = 'table',
            res.props = this.t2
          }
          resolve(res)
        })
      })
    },
    afterRequestForParent(optionList, param) {
      if (param.name === 't1') {
        optionList['form'].$refs['testText'].visiable(true)
      }
      return optionList
    }
  }

  //beforeRouteUpdate (to, from, next){
  //  next();
  //}

}
</script>

<style scoped>

</style>
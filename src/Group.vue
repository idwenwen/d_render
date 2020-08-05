<template>
  <c-group
    :options="groups"
  />
</template>

<script>
export default {
  name: 'CompGroup',
  components: {
    cGroup: () => import('./components/ComponentGroup')
  },
  data() { 
    return {
      form: [{
        type: 'f-select',
        props: {
          options: [{
            label: 'check1',
            value: [
              {
                label: 'check1_1',
                value: 'check1_1'
              }
            ]
          }, {
            label: 'check2',
            value: [
              {
                label: 'check2_1',
                value: [
                  {
                    label: 'check2_1_1',
                    value: 'check2_1_1'
                  },
                  {
                    label: 'check2_1_2',
                    value: 'check2_1_2'
                  }
                ]
              }
            ]
          }]
        }
      }],
      header: 
      {
        disable: {
          'check1': ['operation']
        },
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
          },
          {
            label: 'sum',
            prop: 'sum'
          },
          {
            label: 'tpr',
            prop: 'tpr'
          },
          {
            label: 'fpr',
            prop: 'fpr'
          },
          {
            type: 'weight',
            label: 'weight',
            prop: 'weight',
            total: 160
          },
          {
            type: 'link',
            label: 'operation',
            prop: 'operation',
            content: function(cell) {
              if (cell.row['woe'] > 200) {
                return cell.row[cell.column.property]
              } else {
                if (this.disable) {
                  this.disable()
                }
                return 'disable'
              }
            },
            on: {
              click: function(item, cell) {
                console.log(item + ':' + cell)
              }
            }
          }
        ]
      },
      data: []
    }
  },
  computed: {
    groups() {
      return [
        {
          type: 'form',
          props: {
            form: this.form
          }
        },
        {
          type: 'table',
          props: {
            header: this.header,
            data: this.data
          }
        }
      ]
    }
  },
  beforeMount() {
    this.data = {
      check1_1: this.initData(15),
      check2_1_1: this.initData(20),
      check2_1_2: this.initData(23)
    }
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
      } 
    }
 }
</script>

<style lang="" scoped>

</style>
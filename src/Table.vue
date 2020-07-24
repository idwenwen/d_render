<template>
  <div>
    <c-table
      ref="cusTable"
      :header="header"
      :data="data"
    />
    <el-button @click="setProp('check1')">
      check1
    </el-button>
    <el-button @click="setProp('check2')">
      check2
    </el-button>
  </div>
</template>

<script>
import cTable from './components/TableComponent/PaginationTable'
export default {
  name: 'CusTableTesting',
  components: {
    cTable
  },
  data() { 
    return {
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
  created() {
    this.data = {
      check1: this.initData(15),
      check2: this.initData(20)
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
    },
    setProp(check) {
      this.$refs['cusTable'].linkageChange(check)
    }
  }
 }
</script>

<style lang="" scoped>

</style>
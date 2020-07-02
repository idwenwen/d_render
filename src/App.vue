<template>
  <div>
    this is app
    <span>version: {{ version }}</span>
    <span>time: {{ date }}</span>
    <table-content
      :header="header"
      :data="data"
      :index="1"
      :select="true"
      :combine="true"
      :total="40"
      :async="true"
      @pageChange="pageChange"
      @sortChange="sortChange"
    >
      <template
        v-slot:customCol="props"
      >
        <el-link
          type="warning"
          @click.stop="linkClick(props)"
        >
          {{ linkContent(props) }}
        </el-link>
      </template>
    </table-content>
  </div>
</template>

<script>
import TableContent from './component/DataTable'
export default {
  name: 'App',
  components: {
    'table-content': TableContent
  },
  data() { 
    return {
      version: '1.0.0',
      date: new Date().toString(),
      header: [{
        label: 'id',
        children: [
          {
            label: 'nickname',
            prop: 'nickname',
            sortable: true,
            type: 'link',
            linkMethod: (props) => {
              console.log(props)
            }
          },
          {
            label: 'familyname',
            prop: 'familyname',
            sortable: true,
          }
        ]
      }, {
        label: 'name',
        prop: 'name'
      }, {
        label: 'active',
        type: 'operation',
        operations: [
          {
            name: 'check',
            text: 'check',
            icon: 'el-icon-warning-outline',
            method: (props) => {
              console.log(props)
            }
          }
        ]
      }, {
        label: 'custom',
        type: 'custom'
      }],
      data: []
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    getTableData(start = 0) {
      const res = []
      for (let i = start * 2 ; i < start * 2 + 2; i++) {
        res.push({nickname: i, familyname: i, name: i * 2})
        res.push({nickname: i, familyname: i + 1, name: i * 2})
        res.push({nickname: i, familyname: i, name: i * 2 + 1})
        res.push({nickname: i, familyname: i + 1, name: i * 2 + 1})
      }
      this.data = res
    },
    pageChange(page) {
      this.getTableData(page)
    },
    sortChange(obj) {
      console.log(obj)
    },
    linkClick(props) {
      console.log(props)
      console.log('log check')
    },
    linkContent() {
      // props
      console.log('linkContent')
      return 'default'
    }
  }
 }
</script>
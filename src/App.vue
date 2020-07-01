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
import TableContent from './component/DataTable/cTable'
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
    getTableData() {
      const res = []
      for (let i = 0 ; i < 5; i++) {
        res.push({nickname: i, familyname: i, name: i * 2})
        res.push({nickname: i, familyname: i + 1, name: i * 2})
        res.push({nickname: i, familyname: i, name: i * 2 + 1})
        res.push({nickname: i, familyname: i + 1, name: i * 2 + 1})
      }
      this.data = res
    },
    linkClick(props) {
      debugger
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
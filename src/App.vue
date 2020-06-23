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
      :title-change="true"
    />
  </div>
</template>

<script>
import TableContent from './component/DataTable/TableContent'
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
    }
  }
 }
</script>
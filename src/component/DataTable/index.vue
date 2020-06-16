<template>
  <section>
    <el-table
      :data=""
    >

    </el-table>
  </section>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    /**
     * [{
     *   label, // Name for label
     *   prop, // Implying to data
     *   min-width,
     *   fixed,
     *   
     *   sortable: true/false/'custom'
     *   sort-method,
     * 
     *   resizable
     *   formatter: Function,
     *   show-overflow-tooltip,
     * 
     *   align,
     *   header-align,
     *   
     *   class-name
     *   filter: [{text, value}]
     *   filter-multiple,
     *   filter-method
     * }]
     */
    header: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Object | Array,
      default: () => []
    },
    body: {
      // eslint-disable-next-line
      type: Array | Object,
      default: () => []
    },
    hasIndex: {
      type: Boolean,
      default: true
    },
    hasSelection: {
      type: Boolean,
      default: false
    }
  },
  data() { 
    return {
      tableOptions: [],
      currentOptions: null,
      currentTableData: [],
      currentTableHeader: []
    }
  },
  computed: {

  },
  methods: {
    chooses() {
      if (!Array.isArray(this.header)) {
        this.tableOptions = Object.keys(this.header)
      } else {

      }
    }
  }
 }
</script>

<style lang="" scoped>

</style>
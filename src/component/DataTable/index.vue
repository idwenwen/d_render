<template>
  <section class="data-table">
    <!-- Header Part For Table -->
    <header class="data-table__header">
      <!-- Title And Table-data options(Left part) -->
      <slot name="tableHeaderLeft">
        <div class="">
          <h3 class="data-table__title">
            {{ title }}
          </h3>
          <el-select
            v-if="tableOptions && tableOptions.length > 1"
            v-model="currentOptions"
            placeholder="select please"
            @change="choose"
          >
            <el-options
              v-for="(item, index) in tableOptions"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
      </slot>

      <!-- Search part(Right part) -->
      <slot name="tableHeaderRight">
        <div
          v-if="search"
          class="data-table__search"
        >
          <span v-if="typeof search === 'string'">{{ search }}</span>
          <el-input
            v-model="searchInput"
            placeholder="search variable"
            clearable
            @change="tableSearch"
          />
        </div>
      </slot>
    </header>

    <!-- table content -->
    <main class="data-table__content">
      <table-content
        :header="currentTableHeader"
        :data="currentTableData"
        :attrs="attrs"
        :index="hasIndex"
        :select="hasSelection"
        :operation="operation"
      />
      <div class="data-table__pagination">
        <el-pagination 
          :page-size="pageSize"
          :total="total"
          :page-count="pageCount"
          :layout="layout"
          @current-change="pageChange"
        />
      </div>
    </main>
  </section>
</template>

<script>
import TableContent from './TableContent'
export default {
  name: 'DataTable',

  components: [
    TableContent
  ],

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
    attrs: {
      type: Object,
      default: () => {}
    },
    hasIndex: {
      type: Boolean,
      default: true
    },
    hasSelection: {
      type: Boolean,
      default: false
    },
    operation: {
      type: Object,
      default: () => {}
    },

    // title For this table
    title: {
      type: String,
      default: ''
    },
    // search (Whole table match or one-line match)
    search: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Boolean | String,
      default: true
    },

    // Check will be the all data should showing into table
    needRequest: {
      type: Boolean,
      default: false
    },
    

    total: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Number | Function,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageCount: {
      type: Number,
      default: 7
    },
    layout: {
      type: String,
      default: 'prev, pager, next'
    }
  },
  data() { 
    return {
      tableOptions: [],
      currentOptions: null,
      currentTableHeader: [],
      currentTableData: [],
      // for searchContent:
      searchInput: '',

      currentPage: 1
    }
  },
  computed: {
  },
  methods: {
    initOptions() {
      if (!Array.isArray(this.header)) {
        this.tableOptions = Object.keys(this.header)
      } else {
        this.tableOptions = null
      }
      this.defChoose()
    },

    defChoose() {
      this.currentOptions = this.tableOptions ? this.tableOptions[0] : null
      this.change()
    },

    change() {
      this.getCurrentTableData()
      this.getCurrentTableHeader()
    },

    async getCurrentTableData() {
      if (!this.needRequest) {
        let data
        if (!this.currentOptions) {
          data = this.data
        } else {
          data = this.data[this.currentOptions]
        }
        this.currentTable = data.splice(this.currentPage * this.pageSize - 1, this.pageSize)
      } else {
        this.$emit()
      }
    },

    getCurrentTableHeader() {
      let header
      if(!this.currentOptions) {
        header = this.header
      } else {
        header = this.header[this.currentOptions]
      }
      header.forEach(item => {
        item = Object.assign(this.defaultHeaderSet, item)
        return item
      })
      this.currentTableHeader = header
    },

    tableSearch(value) {
      // Compare value check current line
    },

    pageChange(page) {
      this.currentPage = page
    }
  }
 }
</script>

<style lang="" scoped>

</style>
<template>
  <section class="ctable__container">
    <div
      v-loading="tableLoading"
      class="ctable__table"
    >
      <origin-table
        ref="originTable"
        :data="currentData"
        :header="header"
        :attrs="tableAttrs"
        :combine="true"
        v-bind="$props"
        @sort-change="sortChange"
        @filter-change="filterChange"
        v-on="$listeners"
      >
        <template
          slot="header"
          slot-scope="props"
        >
          <slot
            name="header"
            :header="props"
          />
        </template>
      </origin-table>
    </div>
    <div class="ctable__pagination">
      <el-pagination
        ref="pagination"
        :layout="'prev, pager, next'"
        :page-size="pageSize"
        :total="cTotal"
        :current-page.sync="cPage"
        :background="true"
        :hide-on-single-page="true"
        @current-change="pageChange"
      />
    </div>
  </section>
</template>

<script>
import originTable from '../OriginTable'
export default {
  name: 'CTable',
  components: {
    originTable
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    header: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      default: ''
    },
    tableAttrs: {
      type: Object,
      default: () => {}
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 10
    },
    async: {
      type: Boolean,
      default: false
    }
  },
  data() { 
    return {
      ctotal: this.total,
      cData: [...this.data],

      cpage: 1,

      sCol: '',
      sOrder: '',
      filters: '',

      tableLoading: true,

      searched: '',
      searchFrom: -1,
      searchCol: '',
      needSearch: false,
      
      noData: false
    }
  },
  computed: {
    currentData() {
      let res = []
      if (!this.async) {
        for(let i = (this.cpage - 1) * this.pageSize; i < this.cpage * this.pageSize; i++) {
          res.push(this.cData[i])
        }
      } else {
        res = [...this.cData].slice(0, this.pageSize)
      }
      if (this.noData) {
        return []
      } else {
        return res
      }
    }
  },
  watch: {
    data: {
      handler() {
        this.init()
      },
      deep: true
    },
    header: {
      handler() {
        this.init()
      }
    },
    pageSize() {
      this.init()
      this.toFirstPage()
    }
  },
  beforeMount() {
    this.init()
    this.toFirstPage()
  },
  methods: {
    init() {
      if (this.async) {
        this.ctotal = this.data.length > this.total ? this.data.length : this.total
        this.cData = [...this.data]
        if (this.needSearch) {
          this.search(this.searched, this.searchCol)
        }
      } else {
        this.total = this.data.length
        this.sortChange({column: this.sCol, order: this.sOrder})
        this.tableLoading = false
        this.toFirstPage()
      }
    },

    setCurrentRow(row) {
      this.$refs['originTable'].setCurrentRow(row)
    },

    request() {
      if (this.async){
        this.tableLoading = true
        const res = {
          sortColumn: this.sCol,
          sortOrder: this.sOrder,
          filters: this.filters,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
        this.$emit('request', this.async, res)
      }
    },

    pageChange(page) {
      if (page !== this.cPage) {
        this.cPage = page
        this.request()
      }
    },

    filterChange(filters) {
      this.filters = filters
      this.request()
    },

    sortChange({column, order}) {
      this.sCol = column
      this.sOrder = order
      if (!this.async && this.sCol && this.sOrder) {
        this.cData = this.sortOrder(column && column.property, order)
      } else if (this.async) {
        this.request()
      }
    },

    sortOrder(col, order) {
      const currentTableData = [...this.cData]
      if (col && order) {
        const compareVal = (val1, val2) => {
          return val1 > val2 ? 1 : -1
        }
        currentTableData.sort((a, b) => {
          const aVal = a[col]
          const bVal = b[col]
          return bVal === '-'
            ? -1
            : (aVal === '-') 
              ? 1 
              : compareVal(aVal, bVal)
        })
      }
      return currentTableData
    },

    toFirstPage() {
      this.pageChange(1)
    },

    pageTo(page) { 
      const lastPage = Math.ceil(this.ctotal / this.pageSize)
        this.pageChange(page <= 0
          ? 1 
          : page > lastPage
            ? lastPage 
            : page
        )
    },

    search(content = '', col = '') {
      if (!content || this.searched !== content || this.searchCol !== col) {
        this.searchFrom = -1
        this.notFound = false
      }
      if (this.notFound) {
        return void 0
      }
      this.searched = content
      this.searchCol = col
      if (content) {
        const res = this.searching(content, col, this.searchFrom)
        if (this.searchFrom < 0 && res < 0) {
          this.notFoundAtAll(this.searchFrom)
        } else if (this.searchFrom >= 0 && res < 0){
          this.notFound(this.searchFrom)
        } else {
          this.searchFrom = res
          this.found(this.searchFrom)
        }
      }
    },
    searching(content, col, begin) {
      let res = -1
      Loop:
      for (let i = begin >= 0 ? begin + 1 : 0; i < this.cData.length; i++) {
        if (this.searchCol) {
          for (const key in this.cData[i]) {
            if (this.cData[i][key].match(this.searched)) {
              res = i
              break Loop
            }
          }
        } else {
          if (this.cData[i][this.searchCol].match(this.searched)) {
            res = i
            break Loop
          }
        }
      }
      return res
    },
    notFoundAtAll(lastIndex) {
      if (!this.async) {
        this.noData = true
      } else {
        this.asyncSearch(lastIndex)
      }
    },
    notFound(lastIndex) {
      if (!this.async) {
        this.searchFrom = -1
        this.search(this.searched, this.searchCol)
      } else {
        this.asyncSearch(lastIndex)
      }
    },
    found(index) {
      if (!this.async) {
        const row = index % this.pageSize
        const page = Math.ceil(row / this.pageSize)
        this.pageChange(page)
        this.$nextTick(() => {
          this.setCurrentRow(row)
        })
      } else {
        this.setCurrentRow(index)
      }
    },
    asyncSearch(lastIndex) {
      const lastPage = Math.ceil(this.ctotal / this.pageSize)
      const to = this.cPage + 1 < lastPage ? this.cPage + 1 : lastIndex > 0 ? 1 : this.cPage
      if (to === 1) {
        this.searchFrom = -1
      }
      this.needSearch = true
      this.pageChange(to)
      if (to >= lastPage && lastIndex < 0) {
        this.noData = true
      }
    }
  }
 }
</script>

<style lang="" scoped>

</style>
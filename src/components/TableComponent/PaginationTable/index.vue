<template>
  <section
    v-loading="tableLoading"
    class="ctable__container"
  >
    <div class="ctable__table">
      <origin-table
        ref="originTable"
        :data="currentTableData"
        :header="currentTableHeader"
        v-bind="$attrs"
        @sort-change="sortChange"
        @not-found="searchNotFound"
        @found="seearchFound"
        v-on="tableEvents"
      />
    </div>
    <div class="ctable__pagination">
      <el-pagination
        ref="pagination"
        :layout="'prev, pager, next'"
        :page-size="pageSize"
        :total="currentTotal"
        :current-page.sync="currentPage"
        :background="true"
        :hide-on-single-page="true"
      />
    </div>
  </section>
</template>

<script>
import dataSort from '../OriginTable/mixins/DataSort'
import tableSearch from './mixins/PageationTableSearch'
import originTable from '../OriginTable'
export default {
  name: 'PaginationTable',
  components: {
    originTable
  },
  mixins: [dataSort, tableSearch],
  props: {
    data: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Array | Object,
      default: () => []
    },
    header: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Array | Object,
      default: () => []
    },
    pageSize: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Number | String,
      default: 10
    },
    total: {
      type: Number,
      default: 10
    },
    async: {
      type: Boolean,
      default: false
    },
    headerPagination: {
      type: Boolean,
      default: false
    },
    on: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tableLoading: true,

      property: '',
      currentDatas: [],

      currentPage: 1,
      currentTotal: this.total,

      // for Async
      sortColumn: '',
      sortOrder: '',

      formFilters: {}
    }
  },
  computed: {
    tableEvents() {
      return Object.assign({}, this.$listeners, this.on)
    },
    currentTableData() {
      if (
        this.headerPagination ||
				this.pageSize < 0 ||
				this.pageSize === 'all' ||
				this.async
      ) {
        return this.currentDatas
      } else {
        const start = (this.currentPage - 1) * this.pageSize
        return this.currentDatas.slice(start, start + this.pageSize)
      }
    },
    currentTableHeader() {
      if (!this.property && !Array.isArray(this.header)) {
        return this.header.header
      }
      const list = Array.isArray(this.header)
        ? [...this.header]
        : this.getHeaderList(this.header, this.property)
      if (
        !this.headerPagination ||
				this.pageSize < 0 ||
				this.pageSize === 'all' ||
				this.async
      ) {
        return list
      } else {
        return this.getHeaderPageChange(list, this.currentPage, this.pageSize)
      }
    }
  },
  watch: {
    data: {
      handler() {
        this.setProperty(this.property)
        if (this.async) {
          this.searchAfter()
          this.$nextTick(() => {
            this.tableLoading = false
          })
        }
      }
    },
    currentPage: {
      handler() {
        if (this.async) {
          this.request()
        }
      },
      deep: true
    },
    total: {
      handler() {
        if (this.async) {
          this.currentTotal = this.total
        }
      }
    }
  },
  beforeMount() {
    this.init()
  },
  methods: {
    init() {
      this.setProperty(this.property)
      if ((this.data.length === 0 || this.header.length === 0) && this.async) {
        this.request()
      } else {
        this.tableLoading = false
      }
    },
    getList(obj, pro) {
      const res = []
      const list = Array.isArray(pro) ? pro : [pro]
      for (const val of list) {
        if (obj[val] && Array.isArray(obj[val])) {
          res.push(...obj[val])
        } else if (obj[val]) {
          res.push(obj[val])
        }
      }
      return res
    },
    getHeaderList(obj, pro) {
      const res = [...obj.header]
      const list = pro ? (Array.isArray(pro) ? pro : [pro]) : []
      const disabled = obj.disabled || obj.disable
      if (disabled && list.length > 0) {
        const del = []
        for (const val of list) {
          const newDel = Array.isArray(disabled[val])
            ? disabled[val]
            : disabled[val]
              ? [disabled[val]]
              : []
          if (disabled[val]) {
            if (del.length === 0) {
              del.push(...newDel)
            } else {
              for (const item of del) {
                if (newDel.indexOf(item) < 0) {
                  del.splice(del.indexOf(item), 1)
                }
              }
            }
          }
        }
        for (let i = 0; i < res.length; i++) {
          const item = res[i]
          if (del.indexOf(item.prop) >= 0) {
            res.splice(i, 1)
            i--
          }
        }
      }
      return res
    },
    getHeaderPageChange(list, cp, ps) {
      const li = [...list]
      const res = []
      for (let i = 0; i < li.length; i++) {
        const val = li[i]
        if (val.pageFixed) {
          res.push(val)
          li.splice(i, 1)
        }
      }
      if (res.length > ps) {
        ps = res.length + 1
      }
      const rest = li.splice((cp - 1) * (ps - res.length), ps - res.length)
      res.push(...rest)
      return res
    },
    setProperty(value) {
      this.property = value
      this.currentDatas = Array.isArray(this.data)
        ? [...this.data]
        : this.getList(this.data, this.property)
      if (!this.async) {
        this.sortChange({
          column: this.currentSortColumn,
          order: this.currentOrder
        })
        this.currentTotal = this.currentDatas.length
      } else {
        this.currentTotal = this.total
      }
    },
    sortChange({ column, order }) {
      if (this.async) {
        this.currentSortColumn = order ? column : ''
        this.currentOrder = order
        this.request()
      } else {
        this.currentDatas = this.sortMethod(this.currentDatas, column, order)
      }
    },
    request() {
      this.tableLoading = true
      const res = Object.assign(
        {},
        {
          sortColumn: this.currentSortColumn,
          sortOrder: this.currentOrder,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        },
        this.formFilters
      )
      this.$emit('request', res)
    },

    change() {
      const res = Object.assign(
        {},
        {
          data: this.currentTableData,
          header: this.currentTableHeader,
          sortColumn: this.currentSortColumn,
          sortOrder: this.currentOrder,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          total: this.currentTotal
        },
        this.formFilters
      )
      this.$emit('change', res)
    },

    toFirstPage() {
      this.currentPage = 1
    },

    pageTo(page) {
      const lastPage = Math.ceil(this.currentTotal / this.pageSize)
      this.currentPage = page <= 0 ? 1 : page > lastPage ? lastPage : page
    },

    linkageChange(param) {
      this.setProperty(param)
      this.change()
    },

    linkageForm(param) {
      if (this.async) {
        this.formFilters = param
        this.toFirstPage()
      }
    }
  }
}
</script>

<style lang="" scoped>
</style>

<template>
  <section class="datatable__container">
    <!-- 传递table的相关数据 -->
    <ctable
      ref="table"
      :header="header"
      :data="currentData"
      v-bind="$attrs"
      class="datatable__table"
      @sortChange="sortChange"
      v-on="$listeners"
    >
      <!-- 自定义slot -->
      <template
        v-for="(item, index) in header"
        :slot="item.label + 'Col'"
        slot-scope="props"
      >
        <slot
          :name="item.label + 'Col'"
          :props="props"
        >
          check
        </slot>
      </template>
    </ctable>
    <div class="datatable__pagiantion">
      <el-pagination
        ref="pagination"
        :page-size="pageSize"
        :total="total > data.length ? total : data.length"
        :pager-count="pagerCount"
        :layout="layout"
        :hide-on-single-page="true"
        :current-page.sync="currentPage"
        background
        @current-change="pageChange"
      />
    </div>
  </section>
</template>

<script>
import ctable from './cTable/index'

export default {
  name: 'DataTable',
  components: {
    ctable
  },
  props: {
    header: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    async: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 10
    },
    pagerCount: {
      type: Number,
      default: 7
    },
    layout: {
      type: String,
      default: 'prev, pager, next'
    },
    // 分页展示位置。
    paginationAlign: {
      type: String,
      default: 'right'
    }
  },
  data() { 
    return {
      currentPage: 1,
      sortData: [...this.data],
      sortCol: null,
      sortOrder: null
    }
  },
  computed: {
    // 当前页面的数据
    currentData() {
      if (!this.async) {
        const start = (this.currentPage - 1) * this.pageSize
        const end = this.currentPage * this.pageSize
        return this.sortData.slice(start, end)
      } else {
        return this.sortData.slice(0, this.pageSize)
      }
    }
  },
  watch: {
    data: {
      handler() {
        if (this.$listeners['sortChange']) {
          this.sortData = [...this.data]
        } else {
          this.sortChange()
        }
      },
      deep: true
    }
  },
  methods: {
    // 页面修改
    pageChange(page) {
      if (this.async) { // table数据待异步请求。
        this.$emit('pageChange', page)
      }
    },

    // 可设置当前分页
    setCurrentPage(page) {
      const totalPage = Math.ceil(this.total / this.pageSize)
      this.currentPage = page > totalPage
        ? totalPage
        : page < 0
          ? 0
          : page
      this.pageChange(this.currentPage)
    },

    setCurrentRow(row) {
      this.$refs['table'][0].setCurrentRow(row)
    },

    sortChange(obj) {
      if (obj) {
        this.sortCol = obj.column.property
        this.sortOrder = obj.order
      }
      if (!this.$listeners['sortChange']) {
        if (this.sortCol && this.sortOrder) {
          this.sortData = ([...this.data]).sort((val1, val2) => {
            if (val1 !== '-' && val2 !== '-') {
              return val1 > val2
                ? 1 : -1
            } else if (val1 !== '-' && val2 === '-') {
              return -1
            } else {
              return 1
            }
          })
        } else {
          this.sortData = [...this.data]
        }
      } else if(this.$listeners['sortChange']) {
        this.$emit('sortChange', obj)
      }
    }
  }
}
</script>

<style lang="" scoped>

</style>
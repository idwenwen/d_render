<template>
  <page-table
    ref="cusTable"
    :data="currentData"
    :header="currentHeader"
    :async="false"
    :page-size="pageSize"
    :total="total"
    :name="name"
    @change="tableChange"
    @request="request"
  />
</template>

<script>
export default {
  name: 'TabTable',
  components: {
    pageTable: () => import('./PaginationTable')
  },
  props: {
    header: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Object | Array,
      default: () => []
    },
    data: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Object | Array,
      default: () => []
    },
    async: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Object | Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      property: ''
    }
  },
  computed: {
    currentHeader() {
      if (Array.isArray(this.header)) {
        return this.header
      }
      const dis = []
      const cols = [...this.header.columns]
      const list = Array.isArray(this.property)
        ? this.property
        : [this.property]
      for (const val of list) {
        if (this.header.disabled && this.header.disabled[val]) {
          dis.push(...this.header.disabled[val])
        }
      }
      if (dis.length > 0) {
        const cols = [...this.header.columns]
        for (let i = 0; i < cols.length; i++) {
          if (cols[i].property.indexOf(dis) >= 0) {
            cols.splice(i, 1)
          }
        }
      }
      return cols
    },
    currentData() {
      if (Array.isArray(this.data)) {
        return this.data
      }
      const dataList = []
      const list = Array.isArray(this.property)
        ? this.property
        : [this.property]
      for (const val of list) {
        if (this.data[val]) dataList.push(...this.data[val])
      }
      return dataList
    }
  },
  watch: {
    property() {
      this.change()
    }
  },
  methods: {
    request(...tableParam) {
      this.request('request', ...tableParam)
    },

    setProperty(prop) {
      this.property = prop
    },

    change(param) {
      this.$emit(
        'change',
        Object.assign(
          {
            data: this.currentData,
            header: this.currentHeader
          },
          param
        ),
        this.name
      )
    },

    tableChange(tableParam) {
      if (this.async) {
        this.request(tableParam)
      }
    },

    search(content, col) {
      if (this.$refs['cusTable'].search) {
        this.$refs['cusTable'].search(content, col)
      } else if (this.$refs['cusTable'][0].search) {
        this.$refs['cusTable'][0].search(content, col)
      }
    }
  }
}
</script>

<style lang="" scoped>
</style>

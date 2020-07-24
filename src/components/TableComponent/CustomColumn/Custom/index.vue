<script>
export default {
  name: 'CustomCol',
  data() {
    return {
      // 设置属性默认值。
      minWidth: 120,
      showOverflowTooltip: true
    }
  },
  methods: {
    column(h) {
      const variable = {
        props: Object.assign(
          {
            minWidth: this.minWidth,
            showOverflowTooltip: this.showOverflowTooltip
          },
          this.$attrs
        ),
        scopedSlots: {
          default: cell => {
            if (this.$scopedSlots['default']) {
              return this.$scopedSlots['default'](cell)
            } else {
              return cell.row[cell.column.property]
            }
          }
        }
      }
      return h('el-table-column', variable)
    }
  },
  render(h) {
    return this.column(h)
  }
}
</script>

<style lang="" scoped>
</style>

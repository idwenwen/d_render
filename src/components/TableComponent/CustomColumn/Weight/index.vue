<template>
  <div
    class="cweight__container"
    @click.stop="click(cell)"
  >
    <el-progress
      :percentage="percentage(cell)"
      :show-text="showWeight"
    />
    <span class="cweight__weight">{{ spanContent(cell) }}</span>
  </div>
</template>

<script>
export default {
  name: 'WeightCol',
  props: {
    total: {
      type: Number,
      default: 100
    },
    showWeight: {
      type: Boolean,
      default: false
    },
    cell: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    percentage(cell) {
      let res =
        ((typeof cell.row[cell.column.property] === 'number'
          ? cell.row[cell.column.property]
          : 0) /
          this.total) *
        100
      if (res > 100) res = 100
      else if (res < 0) res = 0
      return res
    },
    spanContent(cell) {
      return cell.row[cell.column.property] || 0
    }
  }
}
</script>

<style lang="" scoped>
</style>

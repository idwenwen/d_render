<template>
  <el-table-column
    :min-width="$attrs['minWidth'] || minWidth"
    :show-overflow-tooltip="$attrs['showOverflowTooltip'] || showOverflowTooltip"
    v-bind="$props"
  >
    <template
      slot="header"
      slot-scope="header"
    >
      <slot
        name="header"
        :header="header"
      >
        {{ header.column.label }}
      </slot>
    </template>
    <template
      slot="default"
      slot-scope="cell"
    >
      <slot :cell="cell">
        {{ cell.row[cell.columns.property] }}
      </slot>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'CustomCol',
  data() {
    return {
      // 设置属性默认值。
      minWidth: 120,
      showOverflowTooltip: true
    }
  }
}
</script>

<style lang="" scoped>

</style>
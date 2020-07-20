<template>
  <customcol
    v-bind="$props"
  >
    <template
      slot="header"
      slot-scope="header"
    >
      <slot
        name="header"
        :header="header"
      />
    </template>
    <template
      slot="default"
      slot-scope="cell"
    >
      <div
        class="cweight__container"
        @click.stop="click(cell)"
      >
        <slot
          name="prepend"
          :weight="cell.row[cell.column.property] || 0"
        />
        <el-progress
          :percentage="(cell.row[cell.column.property] || 0) / total"
          v-bind="$props"
        />
        <slot
          name="append"
          :weight="cell.row[cell.column.property] || 0"
        >
          <span class="cweight__weight">{{ cell.row[cell.column.property] || 0 }}</span>
        </slot>
      </div>
    </template>
  </customcol>
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
      default: true
    }
  },
  methods: {
    click(cell) {
      this.$emit('cell', cell)
    }
  }
}
</script>

<style lang="" scoped>

</style>
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
      <editor
        :value="cell.row[cell.column.property]"
        @change="change"
      />
    </template>
  </customcol>
</template>

<script>
import customcol from '../Custom'
import editor from '../../../FormComponent/Editor'
export default {
  name: 'EditorCol',
  components: {
    editor,
    customcol
  },
  methods: {
    change(updated) {
      this.$emit('change', updated)
    }
  }
 }
</script>

<style lang="" scoped>

</style>
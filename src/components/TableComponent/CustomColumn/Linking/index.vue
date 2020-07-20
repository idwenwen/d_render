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
      <el-link
        v-for="(item,index) in links(content || cell.row[cell.column.property] || '')"
        :key="index"
        :underline="true"
        :type="type"
        :disabled="setDisabled(item)"
        @click.stop="linkClick(item, cell)"
      >
        <slot :cell="cell">
          <slot
            :name="item"
            :cell="cell"
          >
            {{ item }}
          </slot>
        </slot>
      </el-link>
    </template>
  </customcol>
</template>

<script>
import customcol from '../Custom'
export default {
  name: 'LinkingCol',
  components: {
    customcol
  },
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    content: {
      type: String,
      default: ''
    },
    disabled: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Boolean | Function,
      default: false
    }
  },
  methods: {
    linkClick(item, cell) {
      this.$emit('cell', item, cell)
    },
    links(contents) {
      const list = contents.split('|')
      return list
    },
    setDisabled(item) {
      if (typeof this.disabled === 'function') {
        return !!(this.disabled(item))
      }
      return !!this.disabled
    }
  }
}
</script>

<style lang="" scoped>

</style>
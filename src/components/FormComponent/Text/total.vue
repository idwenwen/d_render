<template>
  <ctext
    ref="cusText"
    :content="content"
    :data="data"
    :value="value"
  />
</template>

<script>
export default {
  name: 'CustomTotal',
  components: {
    ctext: () => import('./index')
  },
  props: {
    content: {
      type: String,
      default: 'Total: {t}'
    },
    value: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Object | Array | Boolean | Number,
      default: 0
    }
  },
  data() { 
    return {
      data: {
        '{t}': (value) => { return value }
      }
    }
  },
  methods: {
    format(value) {
      this.$refs['cusText'].format(value)
    }
  }
 }
</script>

<style lang="" scoped>

</style>
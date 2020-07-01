<template>
  <div class="combination__container">
    <component v-if="" :is="componentId"></component>
  </div>
</template>

<script>
import ''
export default {
  name: 'Combination',
  props: {
    attrs: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Array | Object,
      default: () => []
    },

  },
  data() { 
    return {

    }
  },
  methods: {
    combinations(h) {
      
    }
  },
  render(h) {
    return h(
      'div',
      {
        'class': 'combination__container'
      },
      this.combinations(h)
    )
  },
}
</script>

<style lang="" scoped>

</style>
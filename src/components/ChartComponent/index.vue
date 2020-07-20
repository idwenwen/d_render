<template>
  <chart-container
    :options="currentOptions"
    :group="currentGroup"
    :async="false"
    :legend="legend"
    :name="name"
    :zoom="zoom"
  />
</template>

<script>
export default {
  name: 'ChartComponent',
  components: {
    chartContainer: () => import('./ChartContainer')
  },
  props: {
    options: {
      type: Object,
      default: () => {}
    },
    group: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Object | Number,
      default: 1
    },
    name: {
      type: String,
      default: ''
    },
    async: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Object | Boolean,
      default: false
    },
    legend: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Boolean,
      default: 'normal'
    },
    zoom: {
      type: Boolean,
      default: false
    }
  },
  data() { 
    return {
      property: '',
      loading: true
    }
  },
  computed: {
    currentOptions() {
      if (Object.keys(this.options).length <= 0) {
        return {}
      } else if (!this.options.series){
        const list = Array.isArray(this.property) ? this.property[0] : this.property
        return this.options[list]
      } else {
        return this.options
      }
    },
    currentGroup() {
      if (typeof this.group === 'number') {
        return this.group
      } else {
        const list = Array.isArray(this.property) ? this.property[0] : this.property
        return this.group[list]
      }
    }
  },
  watch: {
    property() {
      this.change()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.async) {
        this.request()
      } else {
        this.loading = false
      }
    },
    change() {
      this.$emit('change', this.currentOptions, this.group, this.name)
    },
    request() {
      this.$emit('request', Object.assign({}, this.async, {
        name: this.name
      }))
    }
  }
 }
</script>

<style lang="" scoped>

</style>
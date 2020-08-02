<template>
  <ctransform
    :options="options"
  />
</template>

<script>
export default {
  name: "TestComp",
  components: {
    ctransform: () => import('./components/FormComponent/TransForm')
  },
  data () {
    return {
      options: [],
      label: 'Testing title'
    };
  },
  created() {
    this.options= this.init(30)
  },
  methods: {
    init(val) {
      const res = []
      for (let i = 0 ; i < val; i++) {
        res.push('x' + i)
      }
      return res
    }
  }
}
</script>

<style scoped>

</style>
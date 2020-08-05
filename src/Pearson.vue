<template>
  <div>
    <slider
      :label="'test'"
      @change="con"
    />
  </div>
</template>

<script>
export default {
  name: "Pearson",
  components: {
    slider: () => import('./components/FormComponent/Pearson/dialogSlider')
  },
  data () {
    return {
    };
  },
  methods: {
    con(param) {
      console.log(param)
    }
  }
}
</script>

<style scoped>

</style>
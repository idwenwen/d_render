<template>
  <csortby
    :options="sorts"
    @sorting="con"
  />
</template>

<script>
export default {
  name: "Sorting",
  components: {
    csortby: () => import('./components/FormComponent/SortDialog')
  },
  data () {
    return {
      sorts: [
        {
          label: 'col1',
          value: 'col1'
        },
        {
          label: 'col2',
          value: 'col2'
        }
      ]
    };
  },
  methods: {
    con(param) {
      debugger
      console.log(param)
    } 
  }

  //beforeRouteUpdate (to, from, next){
  //  next();
  //}

}
</script>

<style scoped>

</style>
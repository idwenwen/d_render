<template>
  <tree-sel
    :options="init(10)"
    style="margin-top:80px;"
    @change="con"
  />
</template>

<script>
export default {
  name: "TreeSelected",
  components: {
    treeSel: () => import('./components/FormComponent/TreeSelect/TabList')
  },
  data () {
    return {
    };
  },
  methods: {
    init(val) {
      const res = []
      for (let i = 0; i < val; i++) {
        res.push(20 - Math.ceil(Math.random() * 10))
      }
      return res
    },
    con(param) {
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
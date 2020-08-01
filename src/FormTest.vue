<template>
  <div>
    <!-- <cslider 
      :max="1"
      :min="0"
      :tip="'Form testing'"
      :label="'testing'"
    /> -->
    <cgroup :options="group" />
  </div>
</template>

<script>
export default {
  name: "TestingComponents",
  components: {
    // cslider: () => import('./components/FormComponent/Slider')
    cgroup: () => import('./components/ComponentGroup')
  },
  data () {
    return {
      form: [
        {
          type: 'range',
          props: {
            max: 1,
            min: 0,
            tip: 'Form testing',
            label:'testing',
            step: 0.1
          }
        }
      ],
      table: {
        header: [
          {
            label: 'variable',
            prop: 'variable'
          },
          {
            label: 'iv',
            prop: 'iv'
          }
        ],
        data: []
      },
      group: {}
    };
  },
  created() {
    this.table.data = this.addData(10)
    this.group = [{
      type: 'form',
      props: {
        form: this.form
      }
    }, {
      type: 'table',
      props: this.table
    }]
  },
  methods: {
    addData(val) {
      const res = []
      for (let i = 0; i < val; i++) {
        res.push({
          variable:'x' + i,
          iv: (() => {
            const res = []
            for (let j = 0; j < 10; j++) {
              res.push([j / 10, Math.random() * 100])
            }
            return res
          })()
        })
      }
      return res
    }
  }

  //beforeRouteUpdate (to, from, next){
  //  next();
  //}

}
</script>

<style scoped>

</style>
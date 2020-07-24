<template>
  <div>
    <c-group
      ref="cusDef"
      :form="list"
      @search="con"
      @change="con"
      @form="con"
    />
    <el-button @click="setDef">
      def
    </el-button>
    <el-button @click="setFor">
      format
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'CusForm',
  components: {
    cGroup: () => import('./components/FormComponent/Group')
  },
  data() { 
    return {
      list: [
        // {
        //   type: 'search'
        // },
        // {
        //   type: 'select',
        //   props: {
        //     options: [{
        //       label:'check1',
        //       value:'check1'
        //     },{
        //       label:'check2',
        //       value:'check2'
        //     }],
        //     multiple: true
        //   }
        // },
        // {
        //   type: 'f-select',
        //   props: {
        //     options: [{
        //       label: 'guest',
        //       value: [{
        //         label: 'guest_1',
        //         value: 'guest_1'
        //       }, {
        //         label: 'guest_2',
        //         value: 'guest_2'
        //       }]
        //     }, {
        //       label: 'host',
        //       value: [{
        //         label: 'host_1',
        //         value: 'host_1'
        //       }, {
        //         label: 'host_2',
        //         value: 'host_2'
        //       }]
        //     }]
        //   }
        // },
        // {
        //   type: 'f-select',
        //   props: {
        //     options: [{
        //       label: 'aribter',
        //       value: 'aribter'
        //     }, {
        //       label: 'aribter2',
        //       value: [{
        //         label: 'aribter_1',
        //         value: 'aribtert_1'
        //       }, {
        //         label: 'aribter_2',
        //         value: 'aribter_2'
        //       }]
        //     }],
        //     multiple: true
        //   }
        // },
        // {
        //   type: 'f-select',
        //   props: {
        //     options: [{
        //       label: 'box1',
        //       value: 'box1'
        //     }, {
        //       label: 'box2',
        //       value: 'box2'
        //     }],
        //     multiple: true
        //   }
        // },
        // {
        //   type: 'f-step',
        //   props: {
        //     options: [{
        //       label: '1',
        //       value: 'step1'
        //     }, {
        //       label: '2',
        //       value: 'step2'
        //     }]
        //   }
        // },
        // {
        //   type: 'input'
        // },
        {
          type: 'text',
          props: {
            content: 'total: {t}',
            data: {
              '{t}': (value) => { return value}
            }
          }
        }
      ]
    }
  },
  methods: {
    con(res) {
      console.log(res)
    },
    setDef() {
      this.$refs['cusDef'].setDefault()
    },
    setFor() {
      this.$refs['cusDef'].linkageChange(10)
    }
  }
 }
</script>

<style lang="" scoped>

</style>
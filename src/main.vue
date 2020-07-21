<template>
  <div>
    <!-- <selection
      ref="cusComp"
      :options="options"
      :placeholder="'selected'"
      @change="conl"
    /> -->
    <!-- <cinput
      ref="cusComp"
      :label="'inputed'"
      :search="true"
      @change="conl"
      @search="conl"
    /> -->
    <el-checkbox-group />
    <el-button @click="setPro">
      click
    </el-button>
    <el-button @click="disable">
      disable
    </el-button>
    <el-button @click="able">
      able
    </el-button>
    <el-button @click="getParam">
      getParam
    </el-button>
    <el-button @click="setParam">
      setParam
    </el-button>
  </div>
</template>

<script>
// import selection from './components/FormComponent/reBuild/Select'
// import cinput from './components/FormComponent/reBuild/Input'
export default {
  name: 'MainContent',
  components: {
    // selection
    // cinput
  },
  data() { 
    return {
      options: {
        'check1': [
        {
          label: 'check11',
          value: 'check11'
        },
        {
          label: 'check21',
          value: 'check21'
        }],
        'check2': [
          {
          label: 'check12',
          value: 'check12'
        },
        {
          label: 'check22',
          value: 'check22'
        }]
      }
    }
  },
  methods: {
    setPro() {
      this.$refs['cusComp'].setProperty('check2')
    },
    disable() {
      this.$refs['cusComp'].disable()
    },
    able() {
      this.$refs['cusComp'].able()
    },
    getParam() {
      this.conl(this.$refs['cusComp'].getParam())
    },
    setParam(value) {
      this.$refs['cusComp'].setParam(value)
    },
    conl(value) {
      console.log(value)
    }
  }
 }
</script>

<style lang="" scoped>

</style>
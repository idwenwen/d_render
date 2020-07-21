<template>
  <div>
    <el-radio-group
      v-model="boxGroup"
      @change="change('boxGroup')"
    >
      <el-radio
        v-model="box1"
        :label="'box1'"
        @change="change('box1')"
      >
        checkbox1
      </el-radio>
      <el-radio
        v-model="box2"
        :label="'box2'"
        @change="change('box2')"
      >
        checkbox2
      </el-radio>
    </el-radio-group>
    <el-button @click="setDefault">
      def
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'Macbox',
  data() { 
    return {
      box1: '',
      box2: '',
      boxGroup: []
    }
  },
  watch: {
    box1() {
      this.con('box1:' + this.box1)
    },
    box2() {
      this.con('box2:' + this.box2)
    },
    boxGroup() {
      this.con('boxGroup:' + this.boxGroup)
    }
  },
  methods: {
    con(value) {
      console.log(value)
    },
    change(value) {
      this.con('change emited:' + value + '...' + this.box1 + ' ' + this.box2)
    },
    setDefault() {
      this.boxGroup = 'box1'
    },

  }
 }
</script>

<style lang="" scoped>

</style>
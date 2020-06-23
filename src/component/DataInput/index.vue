<template>
  <div
    v-show="showing"
    class="data-input"
  >
    <el-input
      v-model="currentContent"
      class="data-input__input"
      @change="updateLabel"
      @blur="updateLabel"
    />
    <i
      v-if="success"
      class="el-icon-success data-input__success_icon"
    />
    <i
      v-if="cancel"
      class="el-icon-error data-input__success_icon"
    />
  </div>
</template>

<script>
export default {
  name: 'DataInput',
  props: {
    initData: {
      type: String,
      default: ''
    },

    // ['blur', 'change', 'click']
    level: {
      type: String,
      default: 'change'
    },

    success: {
      type: Boolean,
      default: true
    },
    cancel: {
      type: Boolean,
      default: true
    }
  },
  data() { 
    return {
      currentContent: this.initData,
      showing: true
    }
  },
  methods: {
    updateLabel() {
      this.$emit('updated', this.currentContent)
    },
    visiable(showing) {
      this.showing = !!showing
    },
    clearContent() {
      this.currentContent = ''
    }
  }
 }
</script>

<style lang="" scoped>

</style>
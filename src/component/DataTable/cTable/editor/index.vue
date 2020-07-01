<template>
  <div class="editor__container">
    <div
      v-show="showContent"
      class="editor__main"
    >
      <slot
        name="content"
        :val="currentData"
      >
        <span>{{ currentData }}</span>
        <i class="el-icon-edit" />
      </slot>
    </div>
    <div
      v-show="!showContent"
      class="editor__form"
    >
      <slot
        name="editor"
      >
        <el-input v-model="editorData" />
        <i
          class="el-icon-circle-check"
          @click.stop="update"
        />
        <i
          class="el-icon-circle-close"
          @click.stop="close"
        />
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Editor',
  props: {
    val: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Object | Array,
      default: () => {}
    }
  },
  data() { 
    return {
      currentData: '',
      editorData: '',
      showContent: true
    }
  },
  watch: {
    val() {
      this.currentData = this.val
    }
  },
  created() {
    this.currentData = this.val
  },
  methods: {
    update() {
      this.currentData = this.editorData
      this.$emit('update')
      this.close()
    },

    close() {
      this.showContent = !this.showContent
    }
  }
}
</script>

<style lang="" scoped>

</style>
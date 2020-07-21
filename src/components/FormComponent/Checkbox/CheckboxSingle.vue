<template>
  <div class="box__container">
    <el-checkbox
      :label="value"
      :disabled="disabled"
      @change="choosedChange"
    >
      {{ label }}
    </el-checkbox>
    <groups
      v-if="Object.keys(group).length > 0"
      ref="cusGroup"
      :form="group.form"
      :disabled="disabled"
      :default="true"
      :class-name="group.className"
      @change="groupChange"
      @form="groupForm"
      @search="groupSearch"
    />
  </div>
</template>

<script>
import basicOperation from '@/mixin/BasicOperation'
import disableCheck from '@/mixin/DisableCheck'
export default {
  name: 'CusSingleCheckbox',
  components: {
    groups: () => import('../Group')
  },
  mixins: [
    basicOperation,
    disableCheck
  ],
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    group: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Object | Array,
      default: () => {}
    },

    className: {
      type: String,
      default: ''
    }
  },
  data() { 
    return {
      choosed: false,
      propResult: '',
      formResult: '',

      disabled: false
    }
  },
  watch: {
    choosed() {
      this.boxChange()
    }
  },
  methods: {
    boxChange() {
      this.boxDisable() 
      if (this.choosed && Object.keys(this.group).length === 0) {
        this.propResult = this.value
        this.change(this.propResult)
      }
    },
    boxDisable() {
      if (this.choosed && Object.keys(this.group).length !== 0) {
        this.refOpera('cusGroup', 'able')
      } else if (Object.keys(this.group).length !== 0){
        this.refOpera('cusGroup', 'disable')
      }
    },
    groupChange(res) {
      this.propResult = res
      this.change(this.propResult)
    },
    groupForm(res) {
      this.formResult = res
      this.confirm(this.formResult)
    },
    confirm(value) {
      this.$emit('form', value)
    },
    groupSearch(res) {
      this.$emit('search', res)
    },
    getParam() {
      return this.formResult
    },
    disable() {
      this.disabled = true
      this.refOpera('cusGroup', 'disable')
    },
    able() {
      this.disabled = false
      this.refOpera('cusGroup', 'able')
    },
    setDefault() {
      this.refOpera('cusGroup', 'setDefault')
      this.change(this.propResult)
    },
    choosedChange() {
      this.choosed = !this.choosed
    }
  }
 }
</script>

<style lang="" scoped>

</style>
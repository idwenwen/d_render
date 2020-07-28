<template>
  <div class="box__container">
    <el-radio
      :label="value"
      :disabled="disabled"
      :class="{ 'box__check': Object.keys(group).length > 0 }"
      @change="choosedRadio"
    >{{ label }}</el-radio>
    <groups
      v-if="Object.keys(group).length > 0"
      ref="cusGroup"
      :form="group.form"
      :disabled="disabled"
      :default="true"
      :class-name="group.className"
      class="box__group"
      @change="groupChange"
      @form="groupForm"
      @search="groupSearch"
    />
  </div>
</template>

<script>
import basicOperation from '@/mixin/BasicOperation'
export default {
  name: 'CusSingleRadio',
  components: {
    groups: () => import('../Group')
  },
  mixins: [basicOperation],
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
    single: {
      type: Boolean,
      default: true
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
      if (this.choosed) {
        if (Object.keys(this.group).length === 0) {
          this.propResult = this.value
        }
        this.change(this.propResult)
      }
    },
    boxDisable() {
      if (this.choosed && Object.keys(this.group).length !== 0) {
        this.refOpera('cusGroup', 'able')
      } else if (Object.keys(this.group).length !== 0) {
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
      this.choosed = false
      this.refOpera('cusGroup', 'setDefault')
    },
    choosedRadio() {
      if (this.single) {
        this.choosedChange()
      }
    },
    choosedChange() {
      this.choosed = !this.choosed
    },
    chooseBox() {
      this.choosed = true
    },
    unchooseBox() {
      this.choosed = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../style/position';
.box__container {
	@include flex(row, flex-end, center);
	height: 30px;
	.box__check {
		margin-right: 10px;
	}
}
</style>

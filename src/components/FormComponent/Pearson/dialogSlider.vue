<template>
  <div class="cus-slider__container">
    <i
      class="el-icon-s-operation"
      @click.stop="showDialog"
    />
    <div
      v-show="showing"
      class="cus-slider__content"
      @click.stop
    >
      <span
        v-if="label"
        class="cus-slider__label"
      >{{ label }}</span>
      <el-slider
        v-model="sliderRange"
        :max="max"
        :min="min"
        :step="step"
        :marks="masks"
        range
        class="cus-slider__slider"
      />
      <i
        :class="{'can-choose' :canchoose}"
        class="el-icon-success"
        @click="updateRange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "CusDialogSlide",
  props: {
    max: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: -1
    },
    step: {
      type: Number,
      default: 0.01
    },
    label: {
      type: String,
      default: ''
    },

  },
  data () {
    return {
      oldRange: [this.min, this.max],
      sliderRange: [this.min, this.max],
      canchoose: false,
      showing: false
    };
  },
  computed: {
    masks() {
      return {
        '-1': {
          label: this.min + '',
        },
        '1': {
          label: this.max + ''
        }
      }
    }
  },
  watch: {
    sliderRange: {
      handler() {
        if (this.sliderRange[0] !== this.oldRange[0] || this.sliderRange[1] !== this.oldRange[1]) {
          this.canchoose = true
          this.oldRange = this.sliderRange
        }
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.hideDialog)
    this.inited = true
  },
  beforeDestroy() {
    document.removeEventListener('click', this.hideDialog)
  },
  methods: {
    updateRange() {
      if (this.canchoose){
        this.canchoose = false
        this.$emit('change', this.sliderRange)
      }
    },
    showDialog() {
      this.showing = true
    },
    hideDialog() {
      this.showing = false
    }
  }

  //beforeRouteUpdate (to, from, next){
  //  next();
  //}

}
</script>

<style lang="scss" scoped>
@import '../../../style/position';
@import '../../../style/common_style';
.cus-slider__content {
  @include flex(row, flex-start, center);
  min-width: 300px;
  padding: 0px 12px;
  @include shadow(#aaa);

  position: absolute;
  top: 0px;
  left: 0px;
  background-color: #ffffff;
  height: 65px;
  .cus-slider__label {

  }
  .cus-slider__slider{
    min-width: 230px;
    padding: 0px 20px;
  }
}

.can-choose {
  color: green;
}
</style>
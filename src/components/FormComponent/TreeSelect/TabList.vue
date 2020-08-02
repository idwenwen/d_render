<template>
  <div class="tab__container">
    <div class="tab__content">
      <el-tooltip
        v-for="(item, index) in options"
        :key="index"
        :content="'id:' + index"
        class="item"
        effect="dark"
        placement="top"
      >
        <div
          :style="'background-color:' + colorGet(item) + ';'"
          :class="{'tab__item-active': index === currentChoose}"
          class="tab__item"
          @click.stop="chooseItem(index)"
        />
      </el-tooltip>
    </div>
    <div class="tab__footer" />
  </div>
</template>

<script>
import ColorExchange from '../mixin/ColorExchange'
export default {
  name: "TabList",
  mixins: [ColorExchange],
  props: {
    /**
     * [treesize]
     */
    options: {
      type: Array,
      default: () => []
    },
    basicColor: {
      type: String,
      default: '#494ece'
    }
  },
  data () {
    return {
      currentChoose: 0,
      biggest: 0,
      originColor: ''
    };
  },

  //beforeRouteUpdate (to, from, next){
  //  next();
  //}
  watch: {
    options: {
      handler() {
        this.init()
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      let biggest = 0
      for (let val of this.options) {
        if (val > biggest) {
          biggest = val
        }
      }
      this.biggest = biggest
      this.currentChoose = 0
      this.originColor = this.toRGB(this.basicColor)
    },

    chooseItem(index) {
      this.currentChoose = index
      this.request()
    },

    request() {
      this.$emit('change', {
        id: this.currentChoose,
        treeSize: this.options[this.currentChoose]
      })
      this.$emit('selected', {
        id: this.currentChoose,
        treeSize: this.options[this.currentChoose]
      })
    },

    setDefault() {
      this.currentChoose = 0
      this.request()
    },

    colorGet(size) {
      const colors = this.originColor.replace('RGBA(', '').replace(')', '').split(',')
      colors[3] = 1 - 0.5 * (size / this.biggest)
      return 'RGBA(' + colors.join(',') + ')'
    }
  }
}
</script>

<style lang="scss" scoped>

@import '../../../style/position';
  .tab__container {
    @include flex(row, flex-start, flex-start);
    width: 100%;
    height: 95px;
    padding-bottom: 5px;
    background-color: transparent;
    overflow-y: hidden;
    overflow-x: auto;
    .tab__content {
      @include flex(row, flex-start, flex-start);
      width: 100%;
      height: 70px;
      background-color: #eee;
      .tab__item {
        min-width: 15px;
        height: 64px;
        margin-left: 1px;
        padding: 3px;
      }
      .tab__item:hover {
        padding: 0px;
        border: 3px solid #aaa;
      }
      .tab__item-active {
        position: relative;
      }
      .tab__item-active:hover::after {
        top: 68px;
      }
      .tab__item-active::after {
        content: ' ';
        position: absolute;
        top: 71px;
        left: 0;
        right: 0;
        margin: auto;
        width: 0px;
        height: 0px;
        border: 4px solid transparent;
        border-bottom: 4px solid #000;
      }
    }
  }

</style>
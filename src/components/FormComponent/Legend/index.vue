<template>
  <section class="legend__container">
    <div class="legend__display">
      <div
        v-for="(item, index) in currentList.slice(0, withOutDialog)"
        :key="index"
        class="legend__cp"
        @click.stop="chooseItem(index)"
      >
        <span
          v-for="(val, key) in item"
          :key="key"
          :style="labelDisplay(val.color)"
          class="legend__label"
        >{{ val.label }}</span>
      </div>
      <div
        v-if="currentList.length > withOutDialog"
        class="legend__cp"
        @click="showDialog"
      >
        <span
          v-for="(item, index) in currentList[0]"
          :key="index"
          :style="labelDisplay(unchooseColor[index])"
          class="legend__lable"
        >...</span>
      </div>
      <div class="legend__cp">
        <i
          class="el-icon-download"
          @click.stop="showDialog"
        />
      </div>
    </div>

    <div
      v-show="dialogShowing"
      class="legend__dialog"
    >
      <header class="legend__d-header">
        <span class="legend__d-text">Total: {{ currentList.length }}</span>
        <span class="legend__d-text">Choose: {{ currentChoosed.length }}</span>
        <span
          class="legend__d-clear"
          @click.stop="clearAll"
        >Clear</span>
        <span class="legend__d-hide">
          <i
            class="el-icon-upload"
            @click.stop="hideDialog"
          />
        </span>
      </header>
      <main class="legend__d-main">
        <div
          v-for="(item, index) in currentList"
          :key="index"
          class="legend__cp"
          @click.stop="chooseItem(index)"
        >
          <span
            v-for="(val, key) in item"
            :key="key"
            :style="labelDisplay(val.color)"
            class="legend__label"
          >{{ val.label }}</span>
        </div>
      </main>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CustomeLegend',
  props: {
    choose: {
      type: Array,
      default: () => []
    },
    // 表示当前是全可选还是过滤形式。
    filter: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Boolean | Number,
      default: 12
    }
  },
  data() {
    return {
      filters: this.filter,
      currentList: [],

      defColor: [
        [
          '#494ece',
          '#00d269',
          '#ff8103',
          '#00dfcf',
          '#f23ba9',
          '#0080ff',
          '#c13ce1',
          '#ffcd03',
          '#7c56ff',
          '#a7cf02',
          '#00d3ff',
          '#ff1414'
        ],
        [
          '#6e78fc',
          '#66e4a5',
          '#ffb36f',
          '#6df1e7',
          '#e576c2',
          '#66b3ff',
          '#dd83f2',
          '#ffea84',
          '#b692f6',
          '#e1f397',
          '#77e3ff',
          '#ff5a5a'
        ]
      ],
      unchooseColor: ['#bbbbc8', '#E6E6E6'],
      chooseColor: [],

      selectedColor: 0,
      withOutDialog: 5,
      dialogShowing: false,
      currentChoosed: []
    }
  },
  computed: {
    filterLimit() {
      const limits = this.filters === 'number' ? this.filters : 12
      return Math.floor(limits / this.currentList[0].length)
    }
  },
  watch: {
    choose: {
      handler() {
        this.toDisplay()
        this.colorInit()
      }
    }
  },
  beforeMount() {
    this.toDisplay()
    this.colorInit()
  },
  methods: {
    toDisplay() {
      const res = []
      const originList = [...this.options]
      for (const val of originList) {
        const middle = []
        const list = Array.isArray(val) ? val : [val]
        for (let i = 0; i < list.length; i++) {
          const item = list[i]
          if (item.group) {
            for (let j = 0; j < list.length; j++) {
              const it = list[j]
              middle.push({
                label: typeof item === 'string' ? it : it.label,
                value: typeof item === 'string' ? it : it.value,
                group: item.group,
                color: this.unchooseColor[this.colorSelect(this.unchooseColor.length, j)]
              })
            }
          } else {
            middle.push({
              label: typeof item === 'string' ? item : item.label,
              value: typeof item === 'string' ? item : item.value,
              group: typeof item === 'string' ? item : item.value,
              color: this.unchooseColor[this.colorSelect(this.unchooseColor.length, i)]
            })
          }
        }
        res.push(middle)
      }
      this.currentList = res
    },

    colorSelect(len, index) {
      return index % (len - 1)
    },

    showDialog() {
      this.dialogShowing = true
    },
    hideDialog() {
      this.dialogShowing = false
    },

    labelDisplay(color) {
      return {
        backgroundColor: color
      }
    },

    clearAll() {
      for (const key of this.currentChoosed) {
        this.clearItem(key)
      }
    },

    clearItem(index) {
      const pos = this.currentChoosed.indexOf(index)
      if (pos >= 0) {
        this.currentChoosed.splice(pos, 1)
      }
      const list = this.currentList[index]
      list.forEach((item, index) => {
        if (index === 0 && this.filters) {
          this.selectedColor.push(this.chooseColor[0][index].indexOf(item.color))
        }
        item.color = this.unchooseColor[this.colorSelect(this.unchooseColor.length, index)]
      })
    },

    chooseItem(index, changed = true) {
      if (this.currentChoosed.indexOf(index) >= 0) {
        this.clearItem(index)
      } else {
        if (this.filters) {
          const limit = this.filterLimit
          if (this.currentChoosed.length >= limit) {
            this.clearItem(this.currentChoosed[0])
          }
        }
        this.currentChoosed.push(index)
        const list = this.currentList[index]
        for (let i = 0; i < list.length; i++) {
          const val = list[i]
          const colorIndex = this.colorSelect(this.chooseColor.length, i)
          val.color = this.filters
            ? this.chooseColor[colorIndex][this.selectedColor[0]]
            : this.chooseColor[colorIndex][0]
        }
        if (this.filters) {
          this.selectedColor.splice(0, 1)
        }
      }
      if (changed) {
        this.request()
      }
    },

    colorInit() {
      const limit = this.filterLimit > this.defColor[0].length
        ? this.defColor[0].length
        : this.filterLimit
      const res = []
      for (const val of this.defColor) {
        if (this.filters) {
          const middle = []
          for (let i = 0; i < limit; i++) {
            middle.push(val[i])
          }
          res.push(middle)
        } else {
          res.push(val[0])
        }
      }
      this.chooseColor = res
      if (this.filters) {
        this.selectedColorInit()
      }
    },

    selectedColorInit() {
      const res = []
      for (let i = 0; i < this.chooseColor[0].length; i++) {
        res.push(i)
      }
      this.selectedColor = res
    },

    setDefault() {
      for (let i = 0; i < this.filterLimit; i++) {
        this.chooseItem(i, false)
      }
      this.request()
    },

    change() {
      const res = this.getProperty()
      this.$emit('change', res)
    },

    confirm() {
      const res = this.getProperty(true)
      this.$emit('form', res)
    },

    request() {
      this.confirm()
      this.change()
    },

    getProperty(form = false) {
      const res = []
      for (const val of this.currentList) {
        const group = []
        for (const item of val) {
          if (this.unchooseColor.indexOf(item.color) < 0) {
            if (!form) {
              res.push(item.value)
            } else {
              if (group.indexOf(item.color) < 0) {
                group.push(item.color)
              }
            }
          }
        }
        if (form) {
          res.push({
            group: {
              name: val[0].group,
              color: group
            },
            items: val
          })
        }
      }
      return res
    }
  }
}
</script>

<style lang="" scoped>
</style>

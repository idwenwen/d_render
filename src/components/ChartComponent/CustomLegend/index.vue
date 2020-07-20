<template>
  <section class="cus-legend__container">
    <div class="cus-legend__basic">
      <div
        v-for="(item, index) in basic"
        :key="index"
        class="cus-legend__cp"
      >
        <span
          v-for="(btn, key) in item.val"
          :key="key"
          class="cus-legend__each"
        >{{ btn }}</span>
      </div>
      <div class="cus-legend__icon">
        <i class="el-icon-dowload" />
      </div>
    </div>
    <div class="cus-legend__all">
      <div class="cus-legend__all-header" />
      <div class="cus-legend__all-main">
        <div
          v-for="(item, index) in displayList"
          :key="index"
          class="cus-legend__cp"
        >
          <span
            v-for="(btn, key) in item.val"
            :key="key"
            class="cus-legend__each"
          >{{ btn }}</span>
        </div>
      </div>
      <div class="cus-legend__all-footer" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'CustomLegend',
  props: {
    choose: {
      type: Array,
      default: () => []
    }
  },
  data() { 
    return {
      MaxBasic: 5,
      MaxLines: 12,
      colors: [],
      gray: ['#bbbbc8','#E6E6E6'],
      chooseList: [],
      displayList: [],
      inited: false
    }
  },
  computed: {
    basic() {
      let list = [...this.displayList]
      list = list.slice(0, this.MaxBasic)
      if (this.displayList.length > this.MaxBasic) {
        list.push({
          lines: new Array[this.displayList[0].lines.length].fill('...'),
          color: []
        })
      }
      return list
    },
    total() {
      let total = 0
      for (const val of this.colors) {
        total += val.length
      }
      return this.MaxLines - total
    }
  },
  watch: {
    choose: {
      handler() {
        this.init()
      },
      deep: true
    }
  },
  beforeMount() {
    this.init()
  },
  methods: {
    init() {
      const res = []
      this.inited = false
      for (const val of this.choose) {
        res.push({
          lines: Array.isArray(val) ? val : [val],
          color: []
        })
      }
      this.displayList = res
      this.initColor()
      this.initSelect()
    },
    initColor() {
      const presetColor = [
        ['#494ECE', '#00D269'],
        ['#6E78FC', '#66E4A5']
      ]
      if (Array.isArray(this.choose[0])) {
        this.colors = [[...presetColor[0]].slice(0, this.MaxLines / 2),
          [...presetColor[1]].slice(0, this.MaxLines / 2)]
      } else {
        this.colors = [[...presetColor[0]].slice(0, this.MaxLines / 2)]
      }
    },
    initSelect() {
      for (let i = 0; i < this.displayList.length; i++) {
        if (this.colors[0].length === 0) {
          break
        } else {
          this.select(i)
        }
      }
      this.inited = true
      this.updated()
    },
    select(index) {
      if (this.displayList[index].color.length === 0) {
        if (this.colors[0].length === 0) {
          const pos = this.chooseList.shift()
          this.deleteColor(pos)
        }
        this.setColor(index)
        this.chooseList.push(index)
      } else {
        this.deleteColor(index)
        const pos = this.chooseList.IndexOf(index)
        if (pos >= 0) {
          this.chooseList.splice(pos, 1)
        }
      }
      if (this.inited) {
        this.updated()
      }
    },
    deleteColor(index) {
      const colors = this.displayList[index].color
      for (let i = 0 ; i < colors.length; i++) {
        this.colors[i].push(colors[i])
      }
      this.displayList[index].color = []
    },
    deleteAll() {
      this.chooseList.forEach(item => {
        this.deleteColor(item)
      })
      this.chooseList = []
    },
    setColor(index) {
      const content = this.displayList[index].val
      const res = []
      for (let i = 0; i < content.length; i++) {
        res.push(this.colors[i].shift())
      }
      this.displayList[index].color = res
    },
    getProperties() {
      const res = {}
      this.displayList.forEach((item, index) => {
        if (item.color.length !== 0) {
          for (let i = 0; i < item.lines.length; i++) {
            res[item.lines[i]] = {
              color: item.color[i],
              index: index
            }
          }
        }
      })
      return res
    },
    updated() {
      this.$emit('update', this.getProperties())
    }
  }
 }
</script>

<style lang="" scoped>

</style>
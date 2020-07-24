<template>
  <div>
    <ul class="top">
      <li
        v-for="(tab, index) in processedTabs"
        :key="index"
        :class="{ active: tab.active }"
        class="item"
        @click="handleSwitchTab(tab)"
      >{{ tab.label }}</li>
    </ul>
    <div v-if="currentTab" class="sub">
      <div class="head">{{ currentTab.label }}</div>
      <div
        v-for="(subTab, index) in currentTab.children"
        :key="index"
        :class="{ active: subTab.active }"
        class="item small"
        @click="handleSwitchTab(subTab)"
      >{{ subTab.label }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    tabs: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      processedTabs: []
    }
  },
  computed: {
    currentTab() {
      return this.processedTabs.find(t => t.active)
    }
  },
  watch: {
    tabs: {
      handler(val) {
        if (val && val.length) {
          this.processTabs(val)
        }
      },
      immediate: true
    },
    value: {
      handler(val) {
        this.processedTabs(this.tabs)
      }
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    processTabs(tabs) {
      const [actived1, actived2] = this.value
      this.processedTabs = tabs.map((tab, index) => {
        const { children, ...rest } = tab
        const t = {
          ...rest,
          active: actived1 === tab.value || index < 1
        }
        if (children && children.length) {
          t.children = children.map((child, index) => {
            return {
              ...child,
              parent: t,
              active: actived2 === child.value || index < 1
            }
          })
        }
        return t
      })
    },
    handleSwitchTab(tab) {
      if (tab.active) {
        return
      }
      const tabs = tab.parent ? tab.parent.children : this.processedTabs
      tabs.forEach(t => {
        t.active = t === tab
      })
      if (tabs !== this.processedTabs) {
        this.handleSwitchTab(tab.parent)
      }
      this.changeEvent(tab)
    },
    changeEvent(tab) {
      const values = [tab.value]
      if (tab.parent) {
        values.unshift(tab.parent.value)
      } else if (tab.children) {
        const child = tab.children.find(child => child.active)
        if (child) {
          values.push(child.value)
        }
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$emit('change', values)
      })
    }
  }
}
</script>

<style scoped>
.top {
  padding: 0;
  margin: 0;
}
.item {
  display: inline-block;
  padding: 0 10px;
  font-size: 18px;
}
.item.active {
  text-decoration: underline;
}
.sub {
  display: flex;
}

.head {
  margin-right: 10px;
  font-size: 18px;
}

.item.small {
  font-size: 14px;
}
</style>

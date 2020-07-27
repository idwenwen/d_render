<template>
  <div
    v-loading="loading"
    :class="{
      'async__def-size':loading || displayParam
    }"
    class="async__container"
  >
    <cgroup
      :options="displayParam"
    />
  </div>
</template>

<script>
// import Request from './request'
import dataFilter from '@/mixin/DataFilters'
import cgroup from '../ComponentGroup'
export default {
  name: "CustomAsyncComponent",
  components: {
    cgroup
  },
  mixins: [
    dataFilter
  ],
  props: {
    options: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Array | Object,
      default: () => {}
    },
    afterRequestForParent: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Function | String,
      default: () => {}
    },
    refresh: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Function | String,
      default: () => {}
    }
  },
  data () {
    return {
      cacheData: new Map(),
      displayParam: [],
      loading: true,
      requestParam: Array.isArray(this.options) ? [...this.options] : Object.assign({}, this.options)
    };
  },
  computed: {
    getDataParam() {
      if (!Array.isArray(this.requestParam)) {
        return [{
          name: 'default',
          opts: this.requestParam
        }]
      } else {
        if (!this.property) {
          return []
        } else {
          const list = Array.isArray(this.property) ? this.property : [this.property]
          const res = []
          for (const val of list) {
            let optres = ''
            for (const item of this.requestParam) {
              if (item.name === val) {
                optres = item
              }
            }
            res.push({
              name: val,
              opts: optres
            })
          }
          return res
        }
      }
    }
  },
  watch: {
    property: {
      handler() {
        this.init()
      }
    },
    options: {
      handler() {
        this.requestParam =  Array.isArray(this.options) ? [...this.options] : Object.assign({}, this.options)
      },
      deep: true
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
        this.loading = true
        this.combine().then((params) => {
          this.displayParam = params
          this.$nextTick(() => {
            this.loading = false
          })
        })
    },
    async requesting(opt, name) {
      let result = ''
      if (typeof opt.method === 'string') {
        result = await this[opt.method](opt.props)
      } else {
        result = await opt.method(opt.props)
      }
      let afterTrans = ''
      if (typeof opt.transform === 'string') {
        afterTrans = this[opt.transfrom](result)
      } else {
        afterTrans = opt.transform(result)
      }
      this.cacheData.set(name, afterTrans)
      this.$emit('afterRequest', {
        name,
        resoponse: result,
        setting: afterTrans,
        operation: this.afterRequestForParent 
      })
      return true
    },

    async combine() {
      const newParam = [...this.getDataParam] // 获取当前可能需要展示的内容。
      // 判定当前的内容有哪一些是需要请求的。
      for (let i = 0; i < newParam.length; i++) {
        const val = newParam[i]
        if (!this.cacheData.get(val.name)) {
          await this.requesting(val.opts, val.name)
        }
        const res = this.cacheData.get(val.name)
        if (Array.isArray(res)) {
          newParam.splice(i, 1, ...res)
        } else {
          newParam.splice(i, 1, res)
        }
      }
      return newParam
    },

    linkageChange(res) {
      this.setProperty(res)
    },
    async linkageRefresh() {
      debugger
      this.loading = true
      const list = Array.isArray(this.property) ? this.property : this.property ? [this.property] : ['default']
      for (let i = 0; i < list.length; i++) {
        const val = list[i];
        let origin = ''
        for (const item of this.getDataParam) {
          if (item.name === val) {
            origin = item.opts
            break
          }
        }
        let originData = this.cacheData.get(val)
        this.cacheData.delete(val)
        let newRes = ''
        const params = {
          name: val,
          originParam: origin,
          originData
        }
        if (typeof this.refresh === 'string') {
          newRes = await this[this.refresh](params)
        } else {
          newRes = await this.refresh(params)
        }
        if (!Array.isArray(this.requestParam)) {
          this.requestParam = newRes
        } else {
          for (let j = 0; j < this.requestParam.length; j++) {
            const value = this.requestParam[j];
            if (value.name === val) {
              this.requestParam.splice(j, 1, Object.assign({}, value, newRes))
            }
          }
        }
        this.init()
      }
    }
  }
}
</script>

<style scoped>

</style>
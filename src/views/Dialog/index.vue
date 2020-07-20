<template>
  <el-dialog
    v-loading="dialogLoading"
    :title="title"
    class="cdialog__Container"
  >
    <div class="cdialog__main">
      <div class="cdialog__tabs">
        <div v-if="hasModelOutput">
          {{ tabName[0] }}
        </div>
        <div v-if="hasDataOutput">
          {{ tabName[1] }}
        </div>
        <div v-if="hasLogOutput">
          {{ tabName[2] }}
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CDialog',
  components: {
    combination: () => import('./combination')
  },
  props: {
    component: {
      type: String,
      default: ''
    },

  },
  data() { 
    return {
      dialogLoading: true,
      componentId: 'combination'
    }
  },
  computed: {
    ...mapState([
      'jobId',
      'role', 
      'partyId',
    ]),
    title() {
      // 标题名称拼接
      return this.component
    },
    hasModelOutput() {
      // TODO: 依据model数据确定
      return true
    },
    hasDataOutput() {
      // TODO: 依据model数据确定
      return true
    },
    hasLogOutput() {
      // TODO: 当前确定为true
      return true
    },
    tabName() {
      // TODO: 依据Model数据数值展示名称。
      return ['Model Output', 'Data Output', 'Log']
    }
  },
  watch: {
    component() {
      this.init()
    },
    jobId() {
      this.init()
    },
    role() {
      this.init()
    },
    partyId() {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      if (!this.component) {
        return void 0
      } else {
        // TODO: 初始化请求内容
        // 当前dialog内容将会在model以及metrics请求完成之后进行展示loading将会在此时设置成为false
      }
    },

    async model() {
      // TODO: 请求当前job的model数据
    },

    async metrics() {
      // TODO: 请求当前数据的metrics数据，并进行转换汇总。
    },

    async metricsData() {
      // TODO: metricsData请求内容。
    },

    // 传递当前刷新内容。
    async refresh() {
      // TODO: 将会调用metrics的数据以及并依据待刷新的部分进行内容的请求更新
    },

    async data() {
      // TODO: 请求dataOutput数据内容并转换。
    },

    resize() {
      // TODO: dialog的resize事件同时通知子组件进行resize重绘。
    }
  }
}
</script>

<style lang="" scoped>

</style>
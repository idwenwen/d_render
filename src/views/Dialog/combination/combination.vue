<script>
export default {
  name: 'Combination',
  props: {
    // TODO: 当前组件传递内容有待加工。组件适配情况需要调整。
    attrs: {
      type: Array,
      default: () => []
    },
  },
  data() { 
    return {
      // 当前展示的组件内容。
      loaded: [],

      // 存储当前组件制组件的存储关系。记录组件的index。
      connect: {}
    }
  },
  methods: {
    init() {
      const index = {}
      for (const val of this.attrs) {
        index[val.id] = 0
        if (val.group) {
          
        }
      }
    },
    combinations(h) {
      const list = []
      this.attrs.forEach(item => {
        // 组件通过div进行包裹方便设置间隔，组件外部样式以及大小。
        list.push(h(
          'div',
          {
            'class': 'combination__component'
          },
          [
            h(
              'c' + item.type,
              {
                props: item.attrs,
                ref: item.id
              }
            )
          ]
        ))
      })
      return list
    }
  },
  render(h) {
    return h(
      'div',
      {
        'class': 'combination__container'
      },
      this.combinations(h)
    )
  },
}
</script>

<style lang="" scoped>

</style>
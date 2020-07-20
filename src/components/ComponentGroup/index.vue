<script>
export default {
  name: 'ComponentGroup',
  components: {
    cform: () => import('../FormComponent/Group'),
    ctable: () => import('../TableComponent'),
    cchart: () => import('../ChartComponent')
  },
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  data() { 
    return {

    }
  },
  methods: {
    children(h) {
      debugger
      const child = []
      for (let i = 0; i < this.options.length; i++) {
        const val = this.options[i]
        const variable = {
          props: val.props,
          ref: 'comp' + i,
          on: {
            change:(param, name, origin) => {
              debugger
              if (val.type === 'form') {
                for (let o = i + 1; o < this.options.length; o++) {
                  if (this.$refs['comp' + o] && this.$refs['comp' + o].setProperty) {
                    this.$refs['comp' + o].setProperty(param, name, origin)
                  } else if (this.$refs['comp' + o] && this.$refs['comp' + o][0].setProperty) {
                    this.$refs['comp' + o][0].setProperty(param, name, origin)
                  }
                }
              } else {
                for (let o = i - 1 ; o >= 0; o--) {
                  if (this.options[o].type === 'form') {
                    if (this.$refs['comp' + o] && this.$refs['comp' + o].setConnection) {
                      this.$refs['comp' + o].setConnection(param, name)
                    } else if (this.$refs['comp' + o] && this.$refs['comp' + o][0].setConnection) {
                      this.$refs['comp' + o][0].setConnection(param, name)
                    }
                  }
                }
              }
            }
          }
        }
        if (val.type === 'form') {
          variable.on.search = (content) => {
            debugger
            for (let o = i + 1; o < this.options.length; o++) {
              if (this.options[o].type === 'table') {
                if (this.$refs['comp' + o] && this.$refs['comp' + o].search) {
                  this.$refs['comp' + o].search(content)
                } else if (this.$refs['comp' + o][0] && this.$refs['comp' + o][0].search) {
                  this.$refs['comp' + o][0].search(content)
                }
              }
            }
          }
        }
        child.push(h(
          'div',{
            'class': 'comp-group__each'
          }, [h(
            'c' + val.type,
            variable
          )]
        ))
      }
    },

    groups(h) {
      return h(
        'section', {
          'class': 'cus-group__container'
        },
        this.children(h)
      )
    }
  },
  render(h) {
    return this.groups(h)
  }
 }
</script>

<style lang="" scoped>

</style>
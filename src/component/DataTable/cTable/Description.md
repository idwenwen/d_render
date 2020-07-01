# 组件说明

## index.vue 
  table公用组件

  props 参数结构说明：
  - header: 
    {
      label:  String
      prop:  String
      minWidth:  Number | String
      fixed:  Boolean
      type: ['operation', 'link', 'editor', 'custom'], // 当为custom的时候开启scopeSlot

      linkMethod: Function  // 只有当type是 link的时候才会有效
      operations: [
        {
          name: String // 操作按键名称,
          text: String,
          icon: String, // element ui icon
          img: Image,
          position: 'begin'|'end',
          method: Function // 传递操作名称以及对应操作方法，只有当type是operation的时候有用
        }
      ]
      operationType: ['link', 'btn'] // 当type为operation的时候才会作用。
      operationClass: String // 当type为operation的时候才会作用。
    
      sortable:  true / false / 'custom'
      sortMethod: Function // 当sortable为true的时候又作用。 ctable默认监听sortableChange事件。
    
      resizable: Boolean
      formatter: Function,
      show-overflow-tooltip: Boolean,
    
      align: String // ['left', 'center', 'right'],
      headerAlign: String // ['left', centr, 'right'],
      
      className: String, 
      filter: [{text, value}],
      filterMultiple: Boolean // 当传递filter的时候才会有效,
      filterMethod: Function // 当传递filter之后才会有效,

      children: [header] // 存放子集标题内容。
    },
  
  - data: [
    {
      property: Val // 参数以及相关数值
      property_disable: Boolean // 当前参数对应的单元格是否设置成为disable样式
      _deep: Boolean // 当前行是否设置成为深色样式。
    }
  ],

  - attrs: Object // 参考element UI之中el-table标签的参数。
  - index: Boolean | Function | Number // 是否有index列,以及启示标识
  - select: Boolean // 是否有select列
  - combine: Boolean // Table相同列是否合并。

## operations/index.vue
  操作栏组件: 配合table使用的自定义组件

  props参数
  - type: 'link' | 'btn' // 功能按键形式是链接还是按钮
  - inline: Number // 单行最大功能按键。
  - label: {
      name: String, // click事件将会调用名称为name的事件，如果没有相关事件则尝试调用名称为text的事件
      text: String,
      img: Image,
      icon: String,
      position: 'begin'|'end',
      type: 'primary|success|warning|danger|info',
     
      // 当为link的时候
      underline:boolean
     
      // 当为btn的时候
      plain: boolean
      round: boolean,
      size: String (default: mini)
    }
    - className: String

## editor/index.vue
  编辑功能组件： 配合table使用的自定义组件。

  props参数：
  - val: String | Object | Array // 其中Object以及Array类行主要是为了
  




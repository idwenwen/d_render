# Form Group

## 简介
  form组合以及内容汇总的形式，预设了一定的初始组件以及初始的默认配置情况。

## props
  1. form: [
    {
      type: String, 
      - 表示当前组件的类型。 当前提供的类型主要有 "input' | 'select' | 'checkbox' | 'radio' | 'step'
        - 'input': 
          - 传递参数可以参考el-input的内容。
          - search: Boolean 表示当前框是否展示搜索图标
          - def: Boolean 表示是否选择默认值内容，首次默认值选择会触发一次更新事件
        
        - 'select':
          - 传参可以参考el-select
          - def: Boolean 表示是否选择默认值内容，首次默认值选择会触发一次更新事件
        
        - 'checkbox':
          - 可参考el-checkbox的相关参数
          - group: String 表示当前checkbox所处的组内容。默认在default组别
          - def: Boolean 表示是否选择默认值内容，首次默认值选择会触发一次更新事件
        
        - 'radio':
          - 可参考el-radio的相关参数内容
          - group: String 表示当前的radio所处组别。默认在default组。
          - def: Boolean 表示是否选择默认值内容，首次默认值选择会触发一次更新事件

        - 'step': 步骤选择栏
          - steps: Array
              item => String 每一项内容表示步骤对应的key值。
          - formatter: Function(index, step) 步骤名称的规范函数。
          - def: Boolean 表示是否选择默认值内容，首次默认值选择会触发一次更新事件

        - 'charts': 变化图标框 / 主要针对树状图内容。
          - 参数待定
          - def: Boolean 表示当前有默认选择内容。
      name: String,
      - 当前组件的唯一标识
      props: {}
      - 传递当前相关组件的props情况。 相关组件可以到当前目录下进行查看。
      className: String
      - 当前组件的容器样式
      connectTo: Array
    }
  ]
  2. value: Strnig 
     - 当前内容为了方便v-model指令的使用。
  3. default: Boolean
     - 当前表单生成的时候是否自动首次选择默认值。
  4. confirm: Boolean
     - 当前表单是否有确定案件 default: false
  5. reset: Boolean
     - 当前表单是否需要重置按键 default: false

## event
  1. input: 当前表单如果有值改变触发传递新值 // 方便使用v-model
  2. update: 类似于input

## slot
  暂无

## API
  1. reset: 重置方法。重置当前的表单内容
     - param:
        - def: Boolean , default: false 用于判断是清空当前方法还是，设置为初始值。如果过设置为初始值的话将会触发一次更新事件
  2. confirm: 提交方法，获取当前的表单值内容。

  3. getFormData: 获取当前可下载数据内容。
    - param: 下载数据条件。
  
  4. getFormFile: 获取当前可下载内容的文件信息。

  5. getFormBox: 获取可下载勾选列表。
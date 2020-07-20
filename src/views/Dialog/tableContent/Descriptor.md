# 自定义表格

  props 参数说明

  * title: String // 表格名称
  * subTitle: [{
      label: String, // 子目录标题信息。

      // 传递方法，在表格数据变化的时候将会自动调用方法，自动计算新数值。
      // method是String之中需要替换的字符内容，在计算好相关内容之后会自动的替换字符串之中的内容。
      // 如果不是字符串之中的内容，对应的数据将会在计算出来之后直接添加在label之后，中间用冒号隔开。
      method: Function(header, data) | Number | String,

      // 当前内容标识隔开符号， 默认是冒号
      $between: ':'
    }]
  * form: [
      {
        type: 'input' | 'select' | 'radio' | 'checkbox'
        label: String // 非角色形式的选择，只能对照相关表。
        
        value: String | Array // form表格内容。
        children: Array // 相关子组件内容， 每一项类似当前的数据内容。

        // 当前ratio有相关下拉框选择
        select: [{
          label: String // 选择项展示内容,
          value: String // value类似上面的property
        }]
      }
    ]
  * multiple: Boolean // 多选择 ， 只有当前是据色性选择才会有效。
  * header: {
      property: value
    }
  * data: {
      property: Value
    }
  * async: Boolean // 当前表格数据是否需要异步请求。
  * sortAsync: Boolean // 当async为true的时候有用，sort变化的时候是否需要异步请求。

  events 事件：
  * sort-change: 监听当前table之中的排序变化。
  * current-change: 监听当前table中选中行的变化。
  * filter-change: 监听过滤内容变化。
  * data-update: 当select内容变更的时候。当选择select切换当前table数据的时候触发。
  * select: 选中事件触发。
  * select-change: 选中更改事件触发。
  * select-all: 全选事件触发。
  * async-request: 当前数据需要异步请求，所以当参数之中async设置成为true的时候，所有上述事件的变化（除了current-change）
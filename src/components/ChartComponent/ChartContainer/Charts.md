# charts

## 简介
  图内容展示，依据传递数据拼装echarts配置内容并展示

## props
  1. Options: Object  当前echarts设置。详细配置可见echarts, 当前series请同一位数组形式内容。
  2. group: Number 表示当前多少条数据为1组，从下标0开始，每group数据为一组内容。
  3. name: String 当前图唯一名称
  4. async: Object | Boolean  true表示当前options内容不是设置内容。需要进行内容请求, 传递name。如果为Object则表示代传递的内容。
  5. Legend: 'normal' | 'custom' | true | false normal与true内容表示echarts自带的legend,custom表示自定义的选择内容，false表示无序legend。如果是custom设置的情况series之中的数据要求要有name内容。
  6. zoom: 是否需要添加针对container的缩放行为

## events
  1. created: 当前echarts初始化成功之后。如果过需要请求数据，则在请求完成初始化之后调用。
  2. request: 当前内容请求事件
    - async: Object 请求参数
    - chartsParam: 图内容参数。

## API
  1. getOptions: 获取当前的使用的option
  
  2. getInstance: 获取当前echats实例对象

  3. resize: echarts适配大小

  4. setOption: 设置当前echarts实例的配置内容
    - options：需要设置的配置内容

  5. getChartFile: 获取当前图文件流

  6. getChartData: 获取当前图对应数据内容
    - param: 数据获取条件
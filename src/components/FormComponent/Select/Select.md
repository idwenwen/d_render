# select

## 简介
  当前内容主要针对select内容的情况，其选择内容可以控制相关的展示内容，也可以依据相关的展示内容来确定当前的select的展示情况。

## props
  1. options: Array 选项内容
  2. label: String 当前select选项需要展示的label
  3. def: Boolean 当前选择框是否有默认值。默认为false
  4. value: String 当前选择内容，如果过其为''，但是def为true的话内容将会自动设置为第一选项内容，如果value值有的话，则不论当前def是什么，都会有默认值。
  5. disabled: Boolean 当前select是否置灰
  6. 参考el-select的其他配置内容。

## event
  1. input: 当前value变化的时候会自动的触发当前的时间内容。
  2. change: 类似于input只是当input没有传递时候触发。

## API
  1. clear: 清空当前选择内容。
  2. choosed: 当前选项内容。
  3. disabled: 当前组件置灰
  4. abled: 当前组件可用
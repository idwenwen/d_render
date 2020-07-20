# Active Box

## 简介
  radio或者checkbox, 选择之后对子组件进行激活等可操作项。（当前组件用）

## props:
  box: [
    {
      label: String // 组件的label展示内容,
      value: String // 组件对照值内容。如果过没有将会依据自动等同于label
      children: Object // 每一个数据项是一个group组件相关内容。
    }
  ],

  def: true // 表示默认启动的box是哪一个。默认是第一个，传递的值需要是box之中传递的label

  value: String // 方便当前的内容

## event:
  1. change: 当当前的活动box改变的时候会返回当前活动的box内容。
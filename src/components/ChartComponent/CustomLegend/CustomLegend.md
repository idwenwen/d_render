# Custom Legend

## 简介
  当前内容为数据选中展示内容。主要针对折线图展示，选择当前展示的数据。

## props:
  choose: Array // 标识当前可以选择的折线内容 其中的item 可以是String | Array 当为数组的时候标识针对多条曲线。

## events
  1. update: 当选择内容更新的时候会自动的触发事件，当前的事件在首次的初始化的时候会有一此触发。

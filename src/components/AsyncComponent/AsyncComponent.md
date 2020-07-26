# AsyncComponent

## 简介
  当前组件依据数据内容进行请求并进行内容的存储与处理。当前内容依据property分辨展示内容，如果当前内容没有数据，则请求当前的展示数据，并转换当前的数据内容。

## props:
  1. options: 请求条件参数以及方法。格式如下：
    {
      props: {

      },
      method: String | Function,
      transform: String | Function,
    },
    如果过当前有多个内容需要请求的话。
    {
      key: { // key 值内容不可以是props或者method
        props: {}，
        method: String | Function,
        transform: String | Function
      }
    }
# origin table

## 简介
  原始table展示内容

## props
  data: Array,
  header: Array,
  {
    type: String // 'column | editor | weigth | linking'等等语塞column内容。
    props: {
      el-table-column 相关属性。
    },
    on: { // 当前column 对应的事件内容。
      click: Function, 
    },
    slot: {
      name: Function (h) // 返回结果为函数(props) => {vnode}的形式。
    },
    children: Array // 内容如同当前的数据项内容，但是如果一个header有children属性则他的events以及slot将会不在有效，并且自动定义为column类行。
  }
  attrs: Object, table本身的内容。
  nullFormatter: 'null' | '-' 空值内容展示方式
  zeroFormatter: '0' | '-' 0数据展示方式
  toExp: Boolean 大数据是否需要转换称为科学计数法
  size: Number 数据保留位数 默认为6

## events
  el-table事件内容全支持。
  column-: 这一内容开头的事件主要是支持column内容的事件的， 可以通过props中的header的events变量传递。此为所有列公用事件，props为当前列独用事件。

## slot
  append: table本体的插槽。
  其他为所有column公用的插槽// 具体内容可以见ccolumn文件加下的预定义column。如果需要为column专门添加slot也可以在props之中的header下添加slot内容。

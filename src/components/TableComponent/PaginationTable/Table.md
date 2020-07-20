# table

## 简介：
  表格组件内容
  - 表格主体：数据内容展示与预设自定义行内容。
  - 表格分页：切换表格主体展示内容。
  
## prop:
  1. header: Array 表头内容
    - {
        type: 'normal' | 'editor' | 'weigth' | 'linking' // 表示当前列内容类型，默认为normal表示通常列
        props: Object // 当前项主要传递header的相关属性内容
        on: Object // 当前列内容的处理事件
        slot: Object // render形式编写当前的内容
        children: Array //类当前的header数组的数据项
      }
  2. data: Array 列表数据内容
  3. pageSize: Number 每页展示数据条数
  4. name: String 当前表格名称
  5. total: Number 数据总数，当当前的async为false的时候，total将会直接依据data的总数进行获取，将会忽略传值
  6. async: Object | false 分页及相关功能数据是否需要通过后台进行数据请求, 如果为true的话。传递表格名称以及当前表格的tableParam
  7. spanCombine: Boolean 表格中数据，相同的是否合并。 default: true
  8. nullFormatter: 'null' | '-' 空值内容展示方式
  9. zeroFormatter: '0' | '-' 0数据展示方式
  10. toExp: Boolean 大数据是否需要转换称为科学计数法
  11. size: Number 数据保留位数 默认为6


## events
  1. change:
    - async: 当前带传递的参数内容。或者名称
    - tableParam: 同上
  
## API:
  1. pageTo: 跳转到指定页
    - pageNum: Number 页数

  2. currentTable: 获取当前tableParam参数

  3. search: 搜多当期那表格之中的内容
    - content: String 匹配内容
    - col: 表示当前搜索的列内容。传递property值不要传递label值。
  
  5. setData: 设置当前表格数据内容。
    - data: Array 表格数据内容。

  7. setCurrentRow: 设置当前行内容。
    - row: Number 设置当前行内容。
  
  8. getTableData: 获取当前表格数据内容。
    - param: 数据获取条件。

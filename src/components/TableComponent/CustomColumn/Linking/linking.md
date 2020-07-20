# linking col

## 简介
  链接自定义列内容。预设colum中的文本内容。

## props:
  type: String // 连接类型。
  content: String // 连接内容， 当没有传递的时候默认为对应单元格数据。
  disabled: Boolean // 连接是否禁用

## events:
  click: 点击事件。

## slot
  header: 表头信息内容，传递el-table-column的header-slot相关数值。
  default: 连接内内容，传递el-table-column的default-slot的相关数值。
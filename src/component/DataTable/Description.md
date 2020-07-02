# Pagination table详细说明：

## 简介

  1. 同步表格：传递全部表格数据，展示内容依据分表每页大小摘取数据，传递给表格组件。
  2. 异步表格：依据total以及分页大小确定分页数量，在每一次切换页数的时候调用pageChange事件。

## props详解

  1. header: Array 表头数据内容，传递给表单组件，具体内容可见cTable/description.md
  2. data: Array 表格数据内容。
  3. async: Boolean 异步表格数据获取。
  4. pageSize: Number 单页数据项。
  5. total: Number 数据项总数
  6. pagerCount: Number pager最大展示数量。
  7. layout: String 分页组件格式。
  8. paginationAlign: String 分页组件展示位置。

## events详解
  1. pageChange: 页数切换事件。
  2. sortChange: 排序改变事件。支持全数据排序，并更新当前页的排序内容。
  3. filterChange: 筛选改变事件。
  4. currentChange: 选中行改变事件。
  5. select: 勾选事件。
  6. selectAll: 全选事件。
  7. selectChange: 勾选改变事件。

## select筛选组件内容。
  
## title表头展示内容。
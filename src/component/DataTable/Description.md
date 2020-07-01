# 自定义表格

  props 参数说明

  - title: String // 表格名称
  - subTitle: [{
      label: String, // 子目录标题信息。

      // 传递方法，在表格数据变化的时候将会自动调用方法，自动计算新数值。
      method: Function(header, data) | Number | String, 
    }]
  - select: [
      {
        label: String // 非角色形式的选择，只能对照相关表。
        ratio: String // checkbox选择label,
        
        property: String // 标识当前展示的header，data等数据之中的property对应的数据。

        // 当前ratio有相关下拉框选择
        select: [{
          label: String // 选择项展示内容,
          property: String // 类似上面的property
        }]
      }
    ]
  - multiple: Boolean // 多选择 ， 只有当前是据色性选择才会有效。
  - header: {
      property: value
    }
  - data: {
      property: Value
    }
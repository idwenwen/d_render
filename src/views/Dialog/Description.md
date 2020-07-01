# 详细情况dialogVM层

  当前VM层处理逻辑：

  - 初始化：
    1. Model-API请求，依据反馈数据内容进行数据转换。
    2. Metrics-API请求，整理反馈数据，依据展示形式进行归纳。
    3. 依据model数据确定当前model output标签页的标题。
  
  - 预设方法:
    1. Metrics-Data请求，依据给定的数据组，进行内容反馈。
    2. Metrics-refresh, 请求metrics，更新归纳数据，同时请求metric-data方法。
    3. Data数据请求方法。
    4. Log数据请求方法。// 带考虑当前内容是否需要凡在指定的dialog内容之中。
    5. resize方法用于适配展示内容。
  
  - vuex内容引用
    jobId, role, partyId

  - props:
    component: 需要展示的组件名称
  
  - 监听内容：
    jobId, role, partyId, component: 当有数据变更的时候重新初始化当前的组件内容
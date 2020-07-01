export default {
  DEF_TABLE_ATTR: {
    'maxHeight': 300,
    'size': 'mini',
    'fit': true,
    'highlightCurrentRow': true,
    'border': true,
    'emptyText': 'No Data'
  },

  DEF_COLUMN_ATTR: {
    'minWidth': 120,
    'showOverflowTooltip': true,
    'fixed': false,
    'resizable': true,
    'sortable': false,
    'sortMethod': () => 0,
    'align': 'center',
    'headerAlign': 'center'
  },

  DEF_INDEX_ATTR: {
    type: 'index',
    label: 'index',
    width: 70,
    className: 'table-content__cell-index'
  },
  DEF_INDEX_BEGIN: 1,

  DEF_SELECT_ATTR: {
    type: 'selection',
    width: 70
  }
}
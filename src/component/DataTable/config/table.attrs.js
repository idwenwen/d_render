export default {
  DEF_TABLE_ATTR: {
    'maxHeight': 300,
    'size': 'mini',
    'fit': true,
    'highlightCurrentRow': true,
    'border': true,
    // 'cellClassName': ({row, column}) => {
    //   if (column.label !== 'index') {
    //     if (row[column.property + '_disable']) {
    //       return 'table-content__cell-disable'
    //     }
    //   }
    // },
    // 'headerCellClassNmae': 'table-content__header-cell-default',
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
    'headerAlign': 'center',
    // 'className': 'table-content__cell-default'
  },
  DEF_INDEX_ATTR: {
    type: 'index',
    label: 'index',
    width: 70,
    className: 'table-content__cell-index'
  },
}
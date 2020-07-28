export default {
  components: {
    ccheckbox: () => import('../Checkbox'),
    cradio: () => import('../Radio'),
    ceditor: () => import('../Editor'),
    cinput: () => import('../Input'),
    cselect: () => import('../Select'),
    cstep: () => import('../Step'),
    ctext: () => import('../Text'),
    cselection: () => import('../Selection'),
    ctitle: () => import('../Text/Title'),
    csearch: () => import('../Searching'),
    cbutton: () => import('../Button'),
    clegend: () => import('../Legend')
  },
  exchangeTo(stats) {
    return 'c' + stats
  }
}

import { VueTsTable } from './components/Table'

export default class TsTablePlugin {
  static install (Vue) {
    Vue.component(VueTsTable.name, VueTsTable)
  }
}

export {
  VueTsTable as VueTsTable
}

/*
* The plugin is automatically installed when loaded in browser (not as module).
*/
if (typeof window !== 'undefined' && window['Vue']) {
  window['Vue'].use(VueTsTable)
}

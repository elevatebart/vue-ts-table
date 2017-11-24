import Vue from 'vue'
import { ColumnOptions, VueTsTable } from './components/Table'

export default class TsTablePlugin {
  static install (V: typeof Vue) {
    V.component('vue-ts-table', VueTsTable)
  }
}

export {
  VueTsTable as VueTsTable,
  ColumnOptions as ColumnOptions
}

/*
* The plugin is automatically installed when loaded in browser (not as module).
*/
if (typeof window !== 'undefined' && window['Vue']) {
  (window['Vue'] as typeof Vue).use(TsTablePlugin)
}

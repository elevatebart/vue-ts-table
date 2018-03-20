import Vue from "vue";
import { ColumnOptions, VueTsTable } from "./components/table";

export default class TsTablePlugin {
  static install(V: typeof Vue) {
    V.component("vue-ts-table", VueTsTable);
  }
}

export { VueTsTable, ColumnOptions };

/*
 * The plugin is automatically installed when loaded in browser (not as module).
 */
if ((window as any).Vue) {
  ((window as any).Vue as typeof Vue).use(TsTablePlugin);
}

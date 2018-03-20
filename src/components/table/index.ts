import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import {
  VueTsPagination,
  PageChangedEvent,
  PerPageChangedEvent
} from "@/components/pagination";
import defaultType from "../types/default";
import WithRender from "./template.html?style=./style.css";
import dateType from "../types/date";
import numberType from "../types/number";
import percentageType from "../types/percentage";
import decimalType from "../types/decimal";

let dataTypes: { [typeName: string]: AbstractType } = {
  default: defaultType,
  date: dateType,
  number: numberType,
  percentage: percentageType,
  decimal: decimalType
};

export interface AbstractType {
  format: (value: any, column: ColumnOptions) => string;
  compare: (x: any, y: any, column?: ColumnOptions) => number;
  filterPredicate: (value: any, filter: string) => boolean;
  isRight: boolean;
}

export interface ColumnOptions {
  label: string;
  field?: string;
  type?: string;
  sortable?: boolean;
  filterable?: boolean;
  filter?: (rowval: string, filter: string) => boolean;
  filterOptions?:
    | string[]
    | number[]
    | Array<{ value: string | number; text: string }>;
  placeholder?: string;
  inputFormat?: string;
  outputFormat?: string;
}

export interface SafeColumnOptions extends ColumnOptions {
  field: string;
  type: string;
}

@WithRender
@Component({
  name: "vue-ts-table",
  components: {
    VueTsPagination
  }
})
export class VueTsTable extends Vue {
  // ##### props #####
  @Prop({ default: "table table-bordered" })
  styleClass: string;
  @Prop() title: string;
  @Prop() columns: ColumnOptions[];
  @Prop() customTypes: { [typeName: string]: AbstractType };
  @Prop() rows: Array<{ [field: string]: any }>;
  @Prop() onClick: (row: { [field: string]: any }, index: number) => void;
  @Prop() perPage: number;
  @Prop({ default: true })
  sortable: boolean;
  @Prop({ default: false })
  paginate: boolean;
  @Prop({ default: false })
  paginateOnTop: boolean;
  @Prop({ default: false })
  lineNumbers: boolean;
  @Prop() defaultSortBy: { field: string; type: string };
  @Prop({ default: true })
  responsive: boolean;
  @Prop({ default: false })
  rtl: boolean;
  @Prop() rowStyleClass: string | ((row: { [key: string]: any }) => string);

  // search
  @Prop({ default: false })
  globalSearch: boolean;
  @Prop() searchTrigger: string;
  @Prop() externalSearchQuery?: string;

  // text options
  @Prop({ default: "Search Table" })
  globalSearchPlaceholder: string;

  // pagination text options (defaults are in pagination)
  @Prop() paginationNextText: string;
  @Prop() paginationPrevText: string;
  @Prop() paginationRowsPerPageText: string;
  @Prop() paginationOfText: string;
  @Prop() paginationAllText: string;

  // ##### data #####
  currentPage: number = 1;
  currentPerPage: number = 10;
  sortColumn: number = -1;
  sortType: string = "asc";
  globalSearchTerm: string = "";
  columnFilters: { [key: string]: string } = {};
  filteredRows: Array<{ [key: string]: any }> = [];
  timer: NodeJS.Timer;
  forceSearch: boolean = false;
  sortChanged: boolean = false;
  dataTypes: { [typeName: string]: AbstractType } = dataTypes || {};
  private safeColumns: SafeColumnOptions[] = this.makeSafeColumns();
  private searchTermLowerCase: string;

  created() {
    if (this.customTypes) {
      for (let t of Object.keys(this.customTypes)) {
        this.dataTypes[t] = this.customTypes[t];
      }
    }
  }

  pageChanged(pagination: PageChangedEvent) {
    this.currentPage = pagination.currentPage;
    this.$emit("pageChanged", {
      currentPage: this.currentPage,
      total: Math.floor(this.rows.length / this.currentPerPage)
    });
  }

  perPageChanged(pagination: PerPageChangedEvent) {
    this.currentPerPage = pagination.currentPerPage;
  }

  sort(index: number) {
    if (!this.isSortableColumn(index)) {
      return;
    }
    if (this.sortColumn === index) {
      this.sortType = this.sortType === "asc" ? "desc" : "asc";
    } else {
      this.sortType = "asc";
      this.sortColumn = index;
    }
    this.sortChanged = true;
  }

  click(row: { [key: string]: any }, index: number) {
    if (this.onClick) {
      this.onClick(row, index);
    }
  }

  searchTable() {
    if (this.searchTrigger === "enter") {
      this.forceSearch = true;
      this.sortChanged = true;
    }
  }

  // field can be:
  // 1. regular property - ex: 'prop'
  // 2. nested property path - ex: 'nested.prop'
  collect(obj: any, field: string): any {
    let result = obj;
    const splitter = field.split(".");
    for (let i = 0; i < splitter.length; i++) {
      if (typeof result === "undefined") {
        return undefined;
      } else {
        result = result[splitter[i]];
      }
    }
    return result;
  }

  collectFormatted(
    obj: any,
    column: SafeColumnOptions,
    toLowerCase = false
  ): string {
    let value = this.collect(obj, column.field || "");
    if (!value) return "";

    // lets format the resultant data
    let type = this.dataTypes[column.type];
    let txtVal = type.format(value, column);
    return toLowerCase && txtVal ? txtVal.toLowerCase() : txtVal;
  }

  formattedRow(row: { [field: string]: any }): { [field: string]: string } {
    let formattedRow: { [field: string]: string } = {};
    for (const col of this.safeColumns) {
      formattedRow[col.field] = this.collectFormatted(row, col);
    }
    return formattedRow;
  }

  // Check if a column is sortable.
  isSortableColumn(index: number) {
    const sortable = this.columns[index].sortable;
    const isSortable = typeof sortable === "boolean" ? sortable : this.sortable;
    return isSortable;
  }

  // Get classes for the given header column.
  getHeaderClasses(column: ColumnOptions, index: number) {
    const isSortable = this.isSortableColumn(index);
    const classes = Object.assign({}, this.getClasses(index, "th"), {
      sorting: isSortable,
      "sorting-desc":
        isSortable && this.sortColumn === index && this.sortType === "desc",
      "sorting-asc":
        isSortable && this.sortColumn === index && this.sortType === "asc"
    });
    return classes;
  }

  // Get classes for the given column index & element.
  getClasses(index: number, element: string) {
    const { type, [element + "Class"]: custom } = this.safeColumns[index];
    let isRight = this.dataTypes[type].isRight;
    if (this.rtl) isRight = true;
    const classes = {
      "right-align": isRight,
      "left-align": !isRight,
      [custom]: !!custom
    };
    return classes;
  }

  // since vue doesn't detect property addition and deletion, we
  // need to create helper function to set property etc
  updateFilters(column: ColumnOptions, value: any) {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.$set(this.columnFilters, column.field || "", value);
    }, 400);
  }

  // method to filter rows
  filterRows() {
    let computedRows = JSON.parse(JSON.stringify(this.rows));
    // we need to preserve the original index of rows so lets do that
    for (const [index, row] of computedRows.entries()) {
      row.originalIndex = index;
    }

    if (this.hasFilterRow) {
      for (let col of this.safeColumns) {
        let field = col.field;
        if (col.filterable && this.columnFilters[field]) {
          computedRows = computedRows.filter(
            (row: { [field: string]: any }) => {
              // If column has a custom filter, use that.
              let filter =
                col.filter || this.dataTypes[col.type].filterPredicate;
              return filter(
                this.collect(row, col.field),
                this.columnFilters[field]
              );
            }
          );
        }
      }
    }
    this.filteredRows = computedRows;
  }

  // get column's defined placeholder or default one
  getPlaceholder(column: ColumnOptions) {
    const placeholder = column.placeholder || "Filter " + column.label;
    return placeholder;
  }

  getCurrentIndex(index: number) {
    return (this.currentPage - 1) * this.currentPerPage + index + 1;
  }

  getRowStyleClass(row: { [key: string]: any }) {
    let classes = "";
    classes += this.onClick ? "clickable" : "";
    let rowStyleClasses;
    if (typeof this.rowStyleClass === "function") {
      rowStyleClasses = this.rowStyleClass(row);
    } else {
      rowStyleClasses = this.rowStyleClass;
    }
    if (rowStyleClasses) {
      classes += " " + rowStyleClasses;
    }
    return classes;
  }

  @Watch("columnFilters", { deep: true })
  onColumnFilters() {
    this.filterRows();
  }

  @Watch("rows", { deep: true })
  onRowsChange() {
    this.filterRows();
  }

  // computed
  get searchTerm() {
    return this.externalSearchQuery !== undefined
      ? this.externalSearchQuery
      : this.globalSearchTerm;
  }

  get globalSearchAllowed() {
    if (
      this.globalSearch &&
      !!this.globalSearchTerm &&
      this.searchTrigger !== "enter"
    ) {
      return true;
    }

    if (
      this.externalSearchQuery !== undefined &&
      this.searchTrigger !== "enter"
    ) {
      return true;
    }

    if (this.forceSearch) {
      this.forceSearch = false;
      return true;
    }

    return false;
  }

  // to create a filter row, we need to
  // make sure that there is atleast 1 column
  // that requires filtering
  get hasFilterRow() {
    return !this.globalSearch && this.columns.some(col => !!col.filterable);
  }

  globSearchPredicate(row: any): (c: any) => boolean {
    return c =>
      String(this.collectFormatted(row, c, true)).search(
        this.searchTermLowerCase
      ) > -1;
  }

  globalSearchRows(): Array<{ [key: string]: any }> {
    this.searchTermLowerCase = this.searchTerm.toLowerCase();
    let filteredRows = [];
    for (let row of this.rows) {
      let localPredicate = this.globSearchPredicate(row);
      if (this.columns.some(localPredicate)) {
        filteredRows.push(row);
      }
    }
    return filteredRows;
  }

  sortRows(
    computedRows: Array<{ [key: string]: any }>
  ): Array<{ [key: string]: any }> {
    let col = this.safeColumns[this.sortColumn];
    return computedRows.sort((x, y) => {
      if (!col) {
        return 0;
      }

      let xvalue = this.collect(x, col.field);
      let yvalue = this.collect(y, col.field);
      let type = col.type;
      return (
        this.dataTypes[type].compare(xvalue, yvalue, col) *
        (this.sortType === "desc" ? -1 : 1)
      );
    });
  }

  // this is done everytime sortColumn
  // or sort type changes
  // ----------------------------------------
  get processedRows(): Array<{ [key: string]: any }> {
    let computedRows = this.filteredRows;

    // take care of the global filter here also
    if (this.globalSearchAllowed) {
      computedRows = this.globalSearchRows();
    }

    // taking care of sort here only if sort has changed
    if (
      this.sortColumn !== -1 &&
      this.isSortableColumn(this.sortColumn) &&
      // if search trigger is enter then we only sort
      // when enter is hit
      (this.searchTrigger !== "enter" || this.sortChanged)
    ) {
      computedRows = this.sortRows(computedRows);
      this.sortChanged = false;
    }

    // if the filtering is event based, we need to maintain filter
    // rows
    if (this.searchTrigger === "enter") {
      this.filteredRows = computedRows;
    }

    return computedRows;
  }

  get paginated() {
    let paginatedRows = this.processedRows;

    if (this.paginate) {
      let pageStart = (this.currentPage - 1) * this.currentPerPage;

      // in case of filtering we might be on a page that is
      // not relevant anymore
      // also, if setting to all, current page will not be valid
      if (
        pageStart >= this.processedRows.length ||
        this.currentPerPage === -1
      ) {
        this.currentPage = 1;
        pageStart = 0;
      }

      // calculate page end now
      let pageEnd = paginatedRows.length + 1;

      // if the setting is set to 'all'
      if (this.currentPerPage !== -1) {
        pageEnd = this.currentPage * this.currentPerPage;
      }

      paginatedRows = paginatedRows.slice(pageStart, pageEnd);
    }
    return paginatedRows;
  }

  mounted() {
    this.filteredRows = JSON.parse(JSON.stringify(this.rows));

    // we need to preserve the original index of rows so lets do that
    for (const [index, row] of this.filteredRows.entries()) {
      row.originalIndex = index;
    }

    if (this.perPage) {
      this.currentPerPage = this.perPage;
    }

    // take care of default sort on mount
    if (this.defaultSortBy) {
      for (let [index, col] of this.columns.entries()) {
        if (col.field === this.defaultSortBy.field) {
          this.sortColumn = index;
          this.sortType = this.defaultSortBy.type || "asc";
          this.sortChanged = true;
          break;
        }
      }
    }
  }

  private makeSafeColumns(): SafeColumnOptions[] {
    let cols: SafeColumnOptions[] = [];
    for (let c of this.columns) {
      c.field = c.field || "";
      c.type = c.type || "default";
      cols.push(Object.assign(c));
    }
    return cols;
  }
}

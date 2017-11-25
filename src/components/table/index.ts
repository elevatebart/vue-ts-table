import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { VueTsPagination, PageChangedEvent, PerPageChangedEvent } from '@/components/pagination'
import defaultType from '../types/default'
import WithRender from './template.html?style=./style.css'

let dataTypes: {[typeName: string]: AbstractType} = {}
let coreDataTypes = require.context('../types', false, /^\.\/([\w-_]+)\.js$/)
for (let key of coreDataTypes.keys()) {
  let compName = key.replace(/^\.\//, '').replace(/\.js/, '')
  dataTypes[compName] = coreDataTypes(key).default
}

export interface AbstractType {
  format: (value: any, column: ColumnOptions) => string
  compare: (x: any, y: any, column?: ColumnOptions) => number
  filterPredicate: (value: any, filter: string) => boolean
  isRight: boolean
}

export interface ColumnOptions {
  label: string
  field: string
  type?: string
  sortable?: boolean
  filterable?: boolean
  filter?: (rowval: string, filter: string) => boolean
  filterOptions?: string[] | number[] | Array<{value: string|number, text: string}>
  placeholder?: string
  inputFormat?: string
  outputFormat?: string
}

@WithRender
@Component({
  name: 'vue-ts-table',
  components: {
    VueTsPagination
  }
})
export class VueTsTable extends Vue {
  // ##### props #####
  @Prop({default: 'table table-bordered'})
  styleClass: string
  @Prop()
  title: string
  @Prop()
  columns: ColumnOptions[]
  @Prop()
  customTypes: {[typeName: string]: AbstractType}
  @Prop()
  rows: Array<{[field: string]: any}>
  @Prop()
  onClick: (row: {[field: string]: any}, index: number) => void
  @Prop()
  perPage: number
  @Prop({default: true})
  sortable: boolean
  @Prop({default: false})
  paginate: boolean
  @Prop({default: false})
  paginateOnTop: boolean
  @Prop({default: false})
  lineNumbers: boolean
  @Prop()
  defaultSortBy: {field: string, type: string}
  @Prop({default: true})
  responsive: boolean
  @Prop({default: false})
  rtl: boolean
  @Prop()
  rowStyleClass: string | ((row: {[key: string]: any}) => string)

  // search
  @Prop({default: false})
  globalSearch: boolean
  @Prop()
  searchTrigger: string
  @Prop()
  externalSearchQuery: string

  // text options
  @Prop({default: 'Search Table'})
  globalSearchPlaceholder: string

  // pagination text options (defaults are in pagination)
  @Prop()
  paginationNextText: string
  @Prop()
  paginationPrevText: string
  @Prop()
  paginationRowsPerPageText: string
  @Prop()
  paginationOfText: string
  @Prop()
  paginationAllText: string

  // ##### data #####
  currentPage: number = 1
  currentPerPage: number = 10
  sortColumn: number = -1
  sortType: string = 'asc'
  globalSearchTerm: string = ''
  columnFilters: {[key: string]: string} = {}
  filteredRows: Array<{[key: string]: any}> = []
  timer: NodeJS.Timer
  forceSearch: boolean = false
  sortChanged: boolean = false
  dataTypes: {[typeName: string]: AbstractType} = dataTypes || {}

  created () {
    if (this.customTypes) {
      for (let t of Object.keys(this.customTypes)) {
        this.dataTypes[t] = this.customTypes[t]
      }
    }
  }

  pageChanged (pagination: PageChangedEvent) {
    this.currentPage = pagination.currentPage
    this.$emit('pageChanged', {currentPage: this.currentPage, total: Math.floor(this.rows.length / this.currentPerPage)})
  }

  perPageChanged (pagination: PerPageChangedEvent) {
    this.currentPerPage = pagination.currentPerPage
  }

  sort (index: number) {
    if (!this.isSortableColumn(index)) {
      return
    }
    if (this.sortColumn === index) {
      this.sortType = this.sortType === 'asc' ? 'desc' : 'asc'
    } else {
      this.sortType = 'asc'
      this.sortColumn = index
    }
    this.sortChanged = true
  }

  click (row: {[key: string]: any}, index: number) {
    if (this.onClick) {
      this.onClick(row, index)
    }
  }

  searchTable () {
    if (this.searchTrigger === 'enter') {
      this.forceSearch = true
      this.sortChanged = true
    }
  }

  // field can be:
  // 1. function
  // 2. regular property - ex: 'prop'
  // 3. nested property path - ex: 'nested.prop'
  collect (obj: any, field: string) {

    // utility function to get nested property
    function dig (obj: any, selector: string): any {
      let result = obj
      const splitter = selector.split('.')
      for (let i = 0; i < splitter.length; i++) {
        if (typeof(result) === 'undefined') {
          return undefined
        } else {
          result = result[splitter[i]]
        }
      }
      return result
    }

    if (typeof(field) === 'function') {
      return field(obj)
    } else if (typeof(field) === 'string') {
      return dig(obj, field)
    } else {
      return undefined
    }
  }

  collectFormatted (obj: any, column: ColumnOptions): string {
    let value = this.collect(obj, column.field)

    if (value === undefined) return ''
      // lets format the resultant data
    let type = column.type ? this.dataTypes[column.type] || defaultType : defaultType
    return type.format(value, column)
  }

  formattedRow (row: {[field: string]: any}): {[field: string]: string} {
    let formattedRow: {[field: string]: string} = {}
    for (const col of this.columns) {
      if (col.field) {
        formattedRow[col.field] = this.collectFormatted(row, col)
      }
    }
    return formattedRow
  }

    // Check if a column is sortable.
  isSortableColumn (index: number) {
    const sortable = this.columns[index].sortable
    const isSortable = typeof sortable === 'boolean' ? sortable : this.sortable
    return isSortable
  }

  // Get classes for the given header column.
  getHeaderClasses (column: ColumnOptions, index: number) {
    const isSortable = this.isSortableColumn(index)
    const classes = Object.assign({}, this.getClasses(index, 'th'), {
      'sorting': isSortable,
      'sorting-desc': isSortable && this.sortColumn === index && this.sortType === 'desc',
      'sorting-asc': isSortable && this.sortColumn === index && this.sortType === 'asc'
    })
    return classes
  }

  // Get classes for the given column index & element.
  getClasses (index: number, element: string) {
    const { type, [element + 'Class']: custom } = this.columns[index]
    let dtype = type ? this.dataTypes[type] || defaultType : defaultType
    let isRight = dtype.isRight
    if (this.rtl) isRight = true
    const classes = {
      'right-align': isRight,
      'left-align': !isRight,
      [custom]: !!custom
    }
    return classes
  }

  // since vue doesn't detect property addition and deletion, we
  // need to create helper function to set property etc
  updateFilters (column: ColumnOptions, value: any) {
    const _this = this
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(function () {
      _this.$set(_this.columnFilters, column.field, value)
    }, 400)

  }

  // method to filter rows
  filterRows () {
    let computedRows = JSON.parse(JSON.stringify(this.rows))
      // we need to preserve the original index of rows so lets do that
    for (const [index, row] of computedRows.entries()) {
      row.originalIndex = index
    }

    if (this.hasFilterRow) {
      for (let col of this.columns) {
        if (col.filterable && this.columnFilters[col.field]) {
          computedRows = computedRows.filter((row: {[field: string]: any}) => {

            // If column has a custom filter, use that.
            if (col.filter) {
              return col.filter(this.collect(row, col.field), this.columnFilters[col.field])
            } else {
              // Use default filters
              let type = col.type ? this.dataTypes[col.type] || defaultType : defaultType
              return type.filterPredicate(this.collect(row, col.field), this.columnFilters[col.field])
            }
          })
        }
      }
    }
    this.filteredRows = computedRows
  }

  // get column's defined placeholder or default one
  getPlaceholder (column: ColumnOptions) {
    const placeholder = column.placeholder || 'Filter ' + column.label
    return placeholder
  }

  getCurrentIndex (index: number) {
    return (this.currentPage - 1) * this.currentPerPage + index + 1
  }

  getRowStyleClass (row: {[key: string]: any}) {
    let classes = ''
    classes += this.onClick ? 'clickable' : ''
    let rowStyleClasses
    if (typeof this.rowStyleClass === 'function') {
      rowStyleClasses = this.rowStyleClass(row)
    } else {
      rowStyleClasses = this.rowStyleClass
    }
    if (rowStyleClasses) {
      classes += ' ' + rowStyleClasses
    }
    return classes
  }

  @Watch('columnFilters', { deep: true })
  onColumnFilters () {
    this.filterRows()
  }

  @Watch('rows', { deep: true })
  onRowsChange () {
    this.filterRows()
  }

  // computed
  get searchTerm () {
    return (this.externalSearchQuery != null) ? this.externalSearchQuery : this.globalSearchTerm
  }

    //
  get globalSearchAllowed () {
    if (this.globalSearch
        && !!this.globalSearchTerm
        && this.searchTrigger !== 'enter') {
      return true
    }

    if (this.externalSearchQuery != null
         && this.searchTrigger !== 'enter') {
      return true
    }

    if (this.forceSearch) {
      this.forceSearch = false
      return true
    }

    return false
  }

  // to create a filter row, we need to
  // make sure that there is atleast 1 column
  // that requires filtering
  get hasFilterRow () {
    if (!this.globalSearch) {
      for (let col of this.columns) {
        if (col.filterable) {
          return true
        }
      }
    }
    return false
  }

  // this is done everytime sortColumn
  // or sort type changes
  // ----------------------------------------
  get processedRows () {
    let computedRows = this.filteredRows

      // take care of the global filter here also
    if (this.globalSearchAllowed) {
      let filteredRows = []
      for (let row of this.rows) {
        for (let col of this.columns) {
          if (String(this.collectFormatted(row, col)).toLowerCase()
                .search(this.searchTerm.toLowerCase()) > -1) {
            filteredRows.push(row)
            break
          }
        }
      }
      computedRows = filteredRows
    }

    // taking care of sort here only if sort has changed
    if (this.sortColumn !== -1 && this.isSortableColumn(this.sortColumn) &&

        // if search trigger is enter then we only sort
        // when enter is hit
        (this.searchTrigger !== 'enter' || this.sortChanged)) {

      this.sortChanged = false

      computedRows = computedRows.sort((x,y) => {
        if (!this.columns[this.sortColumn]) {
          return 0
        }

        let xvalue = this.collect(x, this.columns[this.sortColumn].field)
        let yvalue = this.collect(y, this.columns[this.sortColumn].field)
        let type = this.columns[this.sortColumn].type
        let dtype = type ? this.dataTypes[type] || defaultType : defaultType
        return dtype.compare(xvalue, yvalue, this.columns[this.sortColumn])
            * (this.sortType === 'desc' ? -1 : 1)
      })
    }

      // if the filtering is event based, we need to maintain filter
      // rows
    if (this.searchTrigger === 'enter') {
      this.filteredRows = computedRows
    }

    return computedRows
  }

  get paginated () {
    let paginatedRows = this.processedRows

    if (this.paginate) {
      let pageStart = (this.currentPage - 1) * this.currentPerPage

      // in case of filtering we might be on a page that is
      // not relevant anymore
      // also, if setting to all, current page will not be valid
      if (pageStart >= this.processedRows.length
          || this.currentPerPage === -1) {
        this.currentPage = 1
        pageStart = 0
      }

      // calculate page end now
      let pageEnd = paginatedRows.length + 1

      // if the setting is set to 'all'
      if (this.currentPerPage !== -1) {
        pageEnd = this.currentPage * this.currentPerPage
      }

      paginatedRows = paginatedRows.slice(pageStart, pageEnd)
    }
    return paginatedRows
  }

  mounted () {
    this.filteredRows = JSON.parse(JSON.stringify(this.rows))

    // we need to preserve the original index of rows so lets do that
    for (const [index, row] of this.filteredRows.entries()) {
      row.originalIndex = index
    }

    if (this.perPage) {
      this.currentPerPage = this.perPage
    }

    // take care of default sort on mount
    if (this.defaultSortBy) {
      for (let [index, col] of this.columns.entries()) {
        if (col.field === this.defaultSortBy.field) {
          this.sortColumn = index
          this.sortType = this.defaultSortBy.type || 'asc'
          this.sortChanged = true
          break
        }
      }
    }
  }
}

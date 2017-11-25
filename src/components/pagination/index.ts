import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import WithRender from './template.html?style=./style.css'

export interface PageChangedEvent {
  currentPage: number
}

export interface PerPageChangedEvent {
  currentPerPage: number
}

@WithRender
@Component({
  name: 'vue-ts-pagination'
})
export class VueTsPagination extends Vue {
  @Prop({default: 'table table-bordered'})
  styleClass: string
  @Prop({required: true})
  total: number
  @Prop({required: true})
  perPage: number
  @Prop({default: false})
  rtl: boolean

  // text options
  @Prop({default: 'Next'})
  nextText: string
  @Prop({default: 'Prev'})
  prevText: string
  @Prop({default: 'Rows per page:'})
  rowsPerPageText: string
  @Prop({default: 'of'})
  ofText: string
  @Prop({default: 'All'})
  allText: string

  currentPage: number = 1
  currentPerPage: number = 10

  nextPage () {
    if (this.currentPerPage === -1) return
    if (this.nextIsPossible) {
      ++this.currentPage
    }
    this.pageChanged()
  }

  previousPage () {
    if (this.currentPage > 1) {
      --this.currentPage
    }
    this.pageChanged()
  }

  pageChanged () {
    this.$emit('page-changed', {currentPage: this.currentPage})
  }

  perPageChanged (event?: Event) {
    if (event && event.target instanceof HTMLInputElement) {
      this.currentPerPage = parseInt(event.target.value, 10)
    }
    this.$emit('per-page-changed', {currentPerPage: this.currentPerPage})
  }

  @Watch('perPage', {})
  onPerPageChange () {
    if (this.perPage) {
      this.currentPerPage = this.perPage
    } else {
      // reset to default
      this.currentPerPage = 10
    }
    this.perPageChanged()
  }

  get paginatedInfo () {
    if (this.currentPerPage === -1) {
      return `1 - ${this.total} ${this.ofText} ${this.total}`
    }
    const first = (this.currentPage - 1) * this.currentPerPage ? (this.currentPage - 1) * this.currentPerPage : 1
    const last = Math.min(this.total, this.currentPerPage * this.currentPage)
    return `${first} - ${last} ${this.ofText} ${this.total}`
  }

  get nextIsPossible () {
    return (this.total > this.currentPerPage * this.currentPage)
  }

  get prevIsPossible () {
    return this.currentPage > 1
  }

  mounted () {
    if (this.perPage) {
      this.currentPerPage = this.perPage
    }
  }
}

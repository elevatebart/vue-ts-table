import { VueTsPagination } from '@/components/pagination'
import { expect } from 'chai'
import { stub } from 'sinon'
import { mount } from 'vue-test-utils'

describe('VueTsPagination', () => {
  it('should render correct contents', async () => {
    const title = 'Good table'
    const sut = mount<VueTsPagination>(VueTsPagination, {propsData: {
      perPage: 10,
      total: 30}
    })
    await sut.vm.$nextTick()
    let navBtn = sut.element.querySelectorAll('.page-btn')
    console.log(navBtn.length)
    navBtn.length.should.equal(2)
  })
})

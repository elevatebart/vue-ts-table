import { VueTsPagination } from '@/components/pagination'
import { mount } from '@vue/test-utils'

describe('VueTsPagination', () => {
  it('should render correct contents', async () => {
    const sut = mount<VueTsPagination>(VueTsPagination, {propsData: {
      perPage: 10,
      total: 30}
    })
    await sut.vm.$nextTick()
    let navBtn = sut.element.querySelectorAll('.page-btn')
    navBtn.length.should.equal(2)
  })
})

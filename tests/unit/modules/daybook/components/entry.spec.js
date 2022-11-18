import { shallowMount } from '@vue/test-utils'
import Entry from '@/modules/daybook/components/Entry'
import { journalState } from '../../../mock-data/test-journal-state'

describe('Entry component', () => {

  const mockRouter = {
    push: jest.fn()
  }

  const wrapper = shallowMount( Entry, {
    props: {
      entry: journalState.entries[0]
    },
    global: {
      mocks: {
        $router: mockRouter
      }
    }
  })

  test('Should match with the snapshot', () => {
    expect( wrapper.html() ).toMatchSnapshot()
  });

  test('should redirect when clicking on entry-container', () => {

    const entryContainer = wrapper.find('.entry-container')
    entryContainer.trigger('click')

    expect( mockRouter.push ).toHaveBeenCalledWith({
      name: 'entry',
      params: {
        id: journalState.entries[0].id
      }
    })
  })

  test('computed properties', () => {

    expect( wrapper.vm.day).toBe(8)
    expect( wrapper.vm.month).toBe('Noviembre')
    expect( wrapper.vm.yearDay).toBe('2022, Martes')
  })
})

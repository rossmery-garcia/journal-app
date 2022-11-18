import { shallowMount } from '@vue/test-utils';
import EntryList from '@/modules/daybook/components/EntryList'
import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'

import { getEntriesByTerm } from '@/modules/daybook/store/journal/getters'
import { journalState } from '../../../mock-data/test-journal-state'

const createVuexStore = ( initialState ) => createStore({
  modules: {
    journal: {
      ...journal,
      state: { ...initialState }
    }
  }
})

describe('EntryList component', () => {

  const store = createVuexStore( journalState )
  const mockRouter = {
    push: jest.fn()
  }
  let wrapper

  beforeEach(() => {
    jest.clearAllMocks()

    wrapper = shallowMount( EntryList, {
      global: {
        mocks: {
          $router: mockRouter
        },
        plugins: [ store ]
      }
    })
  })

  test('Should call getEntriesByTerm without a term and show two entries', () => {

    expect( wrapper.findAll('entry-stub').length ).toBe(2)
  })

  test('Should call getEntriesByTerm and filter the entries', async () => {

    const input = wrapper.find('input')
    await input.setValue('Second')

    expect( wrapper.findAll('entry-stub').length ).toBe(1)
  })

  test('button should redirect to /new', () => {
    wrapper.find('button').trigger('click')

    expect( mockRouter.push ).toHaveBeenCalledWith({
      name: 'entry',
      params: { id: 'new' }
    })
  })
})
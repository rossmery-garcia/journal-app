import { shallowMount } from '@vue/test-utils'
import EntryView from '@/modules/daybook/views/EntryView'
import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../mock-data/test-journal-state'

import Swal from 'sweetalert2'

const createVuexStore = ( initialState ) => createStore({
  modules: {
    journal: {
      ...journal,
      state: { ...initialState }
    }
  }
})

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn()
}))

describe('EntryView component', () => {

  const store = createVuexStore( journalState )
  store.dispatch = jest.fn()

  const mockRouter = {
    push: jest.fn()
  }
  let wrapper

  beforeEach(() => {
    jest.clearAllMocks()

    wrapper = shallowMount( EntryView, {
      props: {
        id: '-NGMAdkAU-fafWL_zWYc' //-- exists
      },
      global: {
        mocks: {
          $router: mockRouter
        },
        plugins: [ store ]
      }
    })
  })

  test('Should block the user when the Id does not exist', () => {

    const wrapper = shallowMount( EntryView, {
      props: {
        id: 'This Id does not exist in the Store'
      },
      global: {
        mocks: {
          $router: mockRouter
        },
        plugins: [ store ]
      }
    })

    expect( mockRouter.push ).toHaveBeenCalledWith({ name: 'no-entry' })
  })

  test('Should show the entry correctly', () => {
    expect( wrapper.html() ).toMatchSnapshot()
    expect( mockRouter.push ).not.toHaveBeenCalled()
  })

  test('Should delete the entry and exit', async () => {

    Swal.fire.mockReturnValueOnce( await Promise.resolve({ isConfirmed: true }))

    wrapper.find('.btn-danger').trigger('click')

    expect( Swal.fire ).toHaveBeenCalledWith({
      title: '¿Estas seguro?',
      text: 'Una vez borrado, no se puede recuperar',
      showDenyButton: true,
      confirmButtonText: 'Sí, estoy seguro'
    })

    setTimeout(() => {
      expect( store.dispatch ).toHaveBeenCalledWith('jornal/deleteEntry', '-NGMAdkAU-fafWL_zWYc')
      expect( mockRouter.push ).toHaveBeenCalled()
    }, 1)
  })
})
import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../../mock-data/test-journal-state'

const createVuexStore = ( initialState ) => createStore({
  modules: {
    journal: {
      ...journal,
      state: { ...initialState }
    }
  }
})

describe('Vuex: Journal module', () => {

  test('Initial state', () => {

    const store = createVuexStore( journalState )
    const { isLoading, entries } = store.state.journal

    expect( isLoading ).toBeFalsy()
    expect( entries ).toEqual( journalState.entries )
  })

  //================= Mutations =====================
  test('Mutations: setEntries', () => {

    const store = createVuexStore({ isLoading: true, entries: [] })

    store.commit('journal/setEntries', journalState.entries)

    expect( store.state.journal.entries.length ).toBe(2)
    expect( store.state.journal.isLoading ).toBeFalsy()
  })

  test('Mutations: updateEntry', () => {

    const store = createVuexStore( journalState )

    const updateEntry = {
      id: '-NGMAdkAU-fafWL_zWYc',
      date: 1667909963910,
      text: 'First entry from mock-data'
    }

    store.commit('journal/updateEntry', updateEntry)

    const storeEntries = store.state.journal.entries

    expect( storeEntries.length ).toBe(2)
    expect(
      storeEntries.find(e => e.id === updateEntry.id)
    ).toEqual( updateEntry )
  })

  test('Mutations: addEntry and deleteEntry', () => {

    const store = createVuexStore( journalState )

    const addEntry = {
      id: 'ABC-123',
      text: 'Hello World!'
    }

    store.commit('journal/addEntry', addEntry)

    expect( store.state.journal.entries.length ).toBe(3)
    expect( store.state.journal.entries.find( e => e.id === addEntry.id ).id ).toBe( addEntry.id )

    store.commit('journal/deleteEntry', addEntry.id)

    expect( store.state.journal.entries.length ).toBe(2)
    expect( store.state.journal.entries.find( e => e.id === addEntry.id )).toBeFalsy()
  })

  //================= Getters =====================
  test('Getters: getEntriesByTerm and getEntryById', () => {

    const store = createVuexStore( journalState )
    const [ entry1, entry2 ] = journalState.entries

    expect( store.getters['journal/getEntriesByTerm']('').length ).toBe(2)
    expect( store.getters['journal/getEntriesByTerm']('Second') ).toEqual([ entry2 ])

    expect( store.getters['journal/getEntryById'](entry1.id) ).toEqual( entry1 )
  })

  //=============== Actions ======================
  test('Actions: loadEntries', async () => {

    const store = createVuexStore({ isLoading: true, entries: [] })

    await store.dispatch('journal/loadEntries')

    expect( store.state.journal.entries.length ).toBe(2)
  })

  test('Actions: updateEntry', async () => {

    const store = createVuexStore( journalState )

    const updatedEntry = {
      id: '-NGMAdkAU-fafWL_zWYc',
      date: 1667909963910,
      text: 'First entry from mock-data',
      isTest: true
    }

    await store.dispatch('journal/updateEntry', updatedEntry)

    expect( store.state.journal.entries.length ).toBe(2)
    expect(
      store.state.journal.entries.find( e => e.id === updatedEntry.id )
    ).toEqual({
      id: '-NGMAdkAU-fafWL_zWYc',
      date: 1667909963910,
      text: 'First entry from mock-data'
    })
  })

  test('Actions: createEntry and deleteEntry', async () => {

    const store = createVuexStore( journalState )

    const newEntry = {
      date: 1667909908500,
      text: 'New entry from test'
    }

    const id = await store.dispatch('journal/createEntry', newEntry)

    expect( typeof id ).toBe('string')
    expect( store.state.journal.entries.find(e => e.id === id) ).toBeTruthy()

    await store.dispatch('journal/deleteEntry', id)

    expect( store.state.journal.entries.find(e => e.id === id) ).toBeFalsy()
  })
})
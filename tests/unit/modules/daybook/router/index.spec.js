import daybookRouter from '@/modules/daybook/router'

describe('router module Daybook', () => {

  test('router should have this configuration', async () => {

    expect( daybookRouter ).toMatchObject({
      name: 'daybook',
      component: expect.any( Function ),
      children: [
        {
          path: '',
          name: 'no-entry',
          component: expect.any( Function ),
        },
        {
          path: ':id',
          name: 'entry',
          component: expect.any( Function ),
          props: expect.any( Function )
        }
      ]
    })

    //-- first method (volatile) --
    //expect( (await daybookRouter.children[0].component()).default.name ).toBe('NoEntrySelected')
    //expect( (await daybookRouter.children[1].component()).default.name ).toBe('EntryView')

    //-- Second method --
    const promiseRouter = []
    daybookRouter.children.forEach( child => promiseRouter.push( child.component() ))

    const router = (await Promise.all( promiseRouter )).map( r => r.default.name )

    expect( router ).toContain('EntryView')
    expect( router ).toContain('NoEntrySelected')
  })

  test('Should return the route ID', () => {

    const route = {
      params: {
        id: 'ABC-123'
      }
    }
    //-- First method --
    //expect( daybookRouter.children[1].props( route ) ).toEqual({ id: 'ABC-123' })

    //-- Second method --
    const entryRoute = daybookRouter.children.find( route => route.name === 'entry' )
    expect( entryRoute.props( route )).toEqual({ id: 'ABC-123' } )
  })
})
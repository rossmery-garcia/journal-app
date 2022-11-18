import { shallowMount } from '@vue/test-utils';
import HomeView from '@/views/HomeView';

describe('HomeView component', () => {

  test('Should match with the snapshot', () => {
    const wrapper = shallowMount( HomeView )

    expect( wrapper.html() ).toMatchSnapshot()
  });

  test('Clicking on a button should redirect to no-entry', () => {
    const mockRouter = {
      push: jest.fn()
    }

    const wrapper = shallowMount( HomeView, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })

    wrapper.find('button').trigger('click')

    expect( mockRouter.push ).toHaveBeenCalled()
    expect( mockRouter.push ).toBeCalledWith({ name: 'no-entry' })
  })
});
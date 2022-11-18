import { shallowMount } from '@vue/test-utils';
import AboutView from '@/views/AboutView';

describe('AboutView component', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount( AboutView );
  });

  test('Should match with the snapshot', () => {

    expect( wrapper.html() ).toMatchSnapshot();

  });
});
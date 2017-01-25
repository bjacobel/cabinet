import React from 'react';
import { mount } from 'enzyme';

import Routes from '../../src/components/Routes';

jest.mock('../../src/components/Main');

const setPath = (value) => {
  // thanks @cpojer! https://github.com/facebook/jest/issues/890#issuecomment-209698782
  Object.defineProperty(window.location, 'pathname', {
    writable: true,
    value,
  });
};

describe('Routes component', () => {
  it('has a home route', () => {
    setPath('/');
    const routes = mount(<Routes />);
    expect(routes.find('Connect(Main)').length).toBe(1);
  });
});

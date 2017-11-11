import './raf'; // leave this before the enzyme imports

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

window.localStorage = {
  getItem: jest.fn(() => '{}'),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};

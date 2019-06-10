window.localStorage = {
  getItem: jest.fn(() => '{}'),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};

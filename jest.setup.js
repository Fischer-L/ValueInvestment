global.console = {
  log: console.log, // Only allow console.log
  // Do not want the below noisy console outputs produced from testing codes
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/config/'],
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)': '<rootDir>/__mocks__/fileMock.js',
    '\\.css': '<rootDir>/__mocks__/styleMock.js',
  },
};

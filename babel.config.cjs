const { NODE_ENV } = process.env

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: NODE_ENV === 'test' ? 'auto' : false,
        targets: {
          node: '20'
        }
      }
    ]
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '~': '.'
        }
      }
    ]
  ],
  env: {
    development: {
      sourceMaps: 'inline',
      retainLines: true
    },
    test: {
      plugins: ['babel-plugin-transform-import-meta']
    }
  }
}

module.exports = {
  plugins: [
    require('autoprefixer')({ 
      grid: 'autoplace',
      flexbox: 'no-2009'
    }),
    require('postcss-autoreset')({
      reset: {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        fontSize: '100%',
        font: 'inherit',
        verticalAlign: 'baseline'
      }
    }),
    require('postcss-remove-unused-css')({
      'path': './src',
      'exts': ['.vue', '.css', '.scss', '.html']
    })
  ]
}

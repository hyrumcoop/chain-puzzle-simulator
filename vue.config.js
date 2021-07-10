module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/chain-puzzle-simulator/' : '/',
  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
            args[0].title = 'Chain Puzzle Simulator';
            return args;
        });
  }
}
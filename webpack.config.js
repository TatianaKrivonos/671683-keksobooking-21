const path = require(`path`);

module.exports = {
  entry: [
    "./js/global.js",
    "./js/util.js",
    "./js/upload.js",
    "./js/load.js",
    "./js/card.js",
    "./js/pin.js",
    "./js/render.js",
    "./js/filter.js",
    "./js/debounce.js",
    "./js/move.js",
    "./js/form.js",
    "./js/photo.js",
    "./js/main.js"
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};

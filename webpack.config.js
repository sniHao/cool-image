const path = require('path');
//npx webpack --config webpack.config.js
module.exports = {
  entry: ['./template/three-modu.js', './template/three-orbit.js','./template/cool-image'], // 入口文件列表
  output: {
    filename: 'cool-image.js', // 合并后的文件名
    path: path.resolve(__dirname, 'dist') // 输出目录
  },
  mode:'development'
};
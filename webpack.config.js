const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development', // 개발용
  entry: {
    // 시작점
    main: './src/app.js'
  },
  output: {
    path: path.resolve('./dist'), // 하나로 묶어서 내보낼 절대경로
    filename: '[name].js' // entry에 있는 이름으로 내보내짐 -> name = main
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] // css파일과 css의 style을 처리함
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'file-loader', // file을 처리함
            options: {
              publicPath: '.', // 상대경로의 기본 경로 설정
              name: '[name].[ext]?[hash]' // [원본파일명].[원본파일확장자]?[hash값을 쿼리스트링으로 보냄_브라우저가 가진 이미지캐시를 사용하지 않기 위함]
            }
          }
        ]
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    compress: true,
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      // html파일도 dist에 같이 묶음
      template: './src/index.html'
    })
    // new CleanWebpackPlugin() // 이전에 빌드됬던 파일 삭제
  ]
};

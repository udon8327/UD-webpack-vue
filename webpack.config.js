const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = (env, options) => {
  process.env.NODE_ENV = options.mode;
  let isDev = options.mode === 'development';
  console.log(isDev ? '開發環境' : '生產環境');

  let config = {
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: './main.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[hash:8].js',
      // publicPath: ''
    },
    devServer: {
      compress: true, // 是否啟用 gzip 壓縮 預設為false
      port: 3001, // port端口 預設為8080 若被佔用則使用8081
      host: '0.0.0.0', // 預設值為'127.0.0.1'本機 想讓區網中其他裝置存取需設為'0.0.0.0'
      useLocalIp: true, // 使用本機ip而非localhost
      open: false, // 啟動時是否自動開啟頁面
      https: true, // 是否開啟https
      hot: true,
      // contentBase: './src/index.html',
      // watchContentBase: true,
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: false // 不壓縮 HTML
              }
            },
          ],
          include: path.resolve(__dirname, 'src')
        },
        {
          test: /\.pug$/,
          use: [
            'pug-plain-loader',
            // {
            //   loader: 'html-loader',
            //   options: {
            //     minimize: false // 不壓縮 HTML
            //   }
            // },
            // {
            //   loader: 'pug-html-loader',
            //   options: {
            //     pretty: true // 美化 HTML 的編排 (不壓縮HTML的一種)
            //   }
            // }
          ],
          include: path.resolve(__dirname, 'src')
        },
        {
          test: /\.vue$/,
          use: [
            'vue-loader'
            // {
            //   loader: 'vue-loader',
            //   options: {
            //     transformAssetUrls: {
            //       video: ['src', 'poster'],
            //       source: 'src',
            //       img: 'src',
            //       image: ['xlink:href', 'href'],
            //       use: ['xlink:href', 'href']
            //     }
            //   }
            // }
          ]
        },
        {
          test: /\.css$/,
          use: [
            isDev ? 'vue-style-loader' : {
              loader: MiniCssExtractPlugin.loader,
              options: {
                injectType: 'singletonStyleTag', // 多個CSS合併為單一個style標籤
                publicPath: '../', // 指定公共路徑
                // hmr: true, // 開啟 HMR 支持
              },
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [require('autoprefixer')],
              },
            },
          ],
          include: path.resolve(__dirname, 'src')
        },
        {
          test: /\.s[ac]ss$/,
          use: [
            isDev ? 'vue-style-loader' : {
              loader: MiniCssExtractPlugin.loader,
              options: {
                injectType: 'singletonStyleTag', // 多個CSS合併為單一個style標籤
                publicPath: '../', // 指定公共路徑
                // hmr: true, // 開啟 HMR 支持
              },
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [require('autoprefixer')],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  indentedSyntax: true
                },
                // prependData: "sass/_variables.sass"
              }
            }
          ],
          include: path.resolve(__dirname, 'src')
        },
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          exclude: file => (
            /node_modules/.test(file) &&
            !/\.vue\.js/.test(file)
          )
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                publicPath: './',
                name: 'img/[name].[hash:8].[ext]'
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                disable: isDev ? true : false, // 只在 production 環境啟用壓縮
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                optipng: {
                  enabled: false
                },
                pngquant: {
                  quality: [0.65, 0.90],
                  speed: 4
                },
                gifsicle: {
                  interlaced: false
                }
              }
            }
          ],
          include: path.resolve(__dirname, 'src')
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'font/[name].[ext]',
              },
            },
          ],
          include: path.resolve(__dirname, 'src')
        },
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      // new webpack.HotModuleReplacementPlugin(),
      new CleanWebpackPlugin(),
      // new CopyPlugin({
      //   patterns: [
      //     { from: 'public', to: 'public' }
      //   ]
      // }),
      // new webpack.ProvidePlugin({
      //   $: 'jquery',
      //   jQuery: 'jquery'
      // }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash:8].css',
      }),
      new HtmlWebpackPlugin({
        template: '../public/index.html',
        filename: 'index.html',
        inject: true,
        chunks: 'main.js',
        favicon: '../public/favicon.ico',
        // chunksSortMode: 'manual', // 將排序改為手動模式 (即根據 chunks 進行排序)
        minify: {
          sortAttributes: true,
          collapseWhitespace: false, // 折疊空白字元就是壓縮Html
          removeComments: true, // 移除註釋
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'vue': 'vue/dist/vue.esm.js' // 更改Vue編譯版本
      },
      modules: [path.resolve(__dirname, 'node_modules')],
    },
    stats: 'errors-only',
    watchOptions: {
      ignored: /node_modules/,
    },
    devtool: isDev ? 'cheap-module-eval-source-map' : false, // 輸出source-map以方便直接偵錯ES6原始程式
    // externals: { // 排除已使用javascript全域變數的模組
    //   jquery: 'jQuery'
    // },
  };

  // console.log('config', config); // 輸出最終配置
  return config;
};

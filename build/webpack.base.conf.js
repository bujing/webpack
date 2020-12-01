const path = require('path')
const loaderUtils = require('loader-utils')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StylelintWebpackPlugin = require('stylelint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

const scssRegex = /\.scss$/ // 全局 SCSS
const scssModuleRegex = /\.module\.scss$/ // SCSS 模块

function getScssLoaders (isModule) {
  return [
    {
      loader: MiniCssExtractPlugin.loader
    },
    {
      loader: 'css-loader',
      options: {
        modules: isModule && {
          // localIdentName: '[name]__[local]--[hash:base64:5]',
          // 模块样式名称格式化，参考自 Create React App
          getLocalIdent: (context, localIdentName, localName, options) => {
            const hash = loaderUtils.getHashDigest(context.resourcePath + '.' + localName, 'md5', 'base64', 5)
            return loaderUtils.interpolateName(context, '[name]__' + localName + '--' + hash, options).replace('.module_', '_')
          }
        },
        sourceMap: isDev
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            'postcss-preset-env'
          ]
        },
        sourceMap: isDev
      }
    },
    {
      loader: 'sass-loader',
      options: {
        implementation: require('sass'),
        sourceMap: isDev
      }
    }
  ]
}

module.exports = {
  entry: {
    index: './src/main'
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(ts|vue)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: scssRegex,
        exclude: scssModuleRegex,
        use: getScssLoaders(false)
      },
      {
        test: scssModuleRegex,
        use: getScssLoaders(true)
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          context: path.resolve(__dirname, '../src'),
          limit: 10000,
          name: '[path][name].[hash:20].[ext]'
        }
      }
    ]
  },
  output: {
    // chunkFilename: '[name].[contenthash].js', // 默认使用 [id].js 或从 filename 中推断
    filename: isDev ? '[name].js' : 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/' // 配合 historyApiFallback，使静态文件重定向回根目录
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : 'css/[name].[contenthash].css'
    }),
    new StylelintWebpackPlugin({
      context: 'src',
      configFile: path.resolve(__dirname,'../stylelint.config.js'),
      files: '**/*.scss',
      failOnError: false,
      quiet: true,
      fix: true
    })
  ],
  resolve: {
    extensions: ['.ts', '.js'], // 必须指定 '.js'，否则编译会报错
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  }
}

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.

module.exports = () => {
  return {
    mode: "development",

    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },

    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Webpack Plugin",
      }),
      new MiniCssExtractPlugin(),
      new WebpackPwaManifest({
        name:"Just another text editor v90001",
        short_name:"JATEv9001",
        description:"Another text editor to throw on the pile. It edits text. It can even do it offline? But is this what society really needs?",
        background_color: '#ffffff',
        crossorigin: null,
        start_url:'./',
        publicPath:'./',
        icons:[
          {
            src:path.resolve('./src/images/logo.png'),
            sizes:[96,128,192,256,384,512],
          }
        ]
      }),
      new InjectManifest({
        swSrc:'./src/src-sw.js',
        swDest:'./service-worker_GM.js',
        include: [/\.(?:png|jpg|jpeg|gif|bmp|webp|svg)$/i],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },

        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
          type: "asset/resource",
        },

        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};

const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
// const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
const ManifestPlugin = require("webpack-manifest-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const getPublicUrlOrPath = require("react-dev-utils/getPublicUrlOrPath");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const webpack = require("webpack");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === "development",
  require(resolveApp("package.json")).homepage,
  process.env.PUBLIC_URL
);

module.exports = (_, argv) => {
  return {
    mode: argv.mode === "production" ? "production" : "development",
    devtool: argv.mode === "production" ? "" : "source-map",
    bail: argv.mode === "production",
    // if the project is based on js files set entry to index.js
    entry: "./src/index.tsx",

    output: {
      path: path.resolve(__dirname + "/dist"),
      publicPath: "/",
      filename:
        argv.mode === "production" ? "[name].[contenthash:8].js" : "bundle.js",
      chunkFilename:
        argv.mode === "production"
          ? "assets/js/[name].[contenthash:8].chunk.js"
          : "[name].chunk.js",
    },

    devServer: {
      // this is for dev mode.
      //contentBase: './dist',
      // this is only for production mode.
      port: 3000,
      historyApiFallback: true,
      open: true,
    },

    // I used this config in the last project with the company I worked on. feel free to use it or just put your own. it has an uncredible effect on the performance on that project.
    optimization: {
      minimize: argv.mode === "production",
      minimizer: [new OptimizeCSSAssetsPlugin({}), new TerserJSPlugin()],
      //   splitChunks: {
      //     chunks: 'all',
      //     maxInitialRequests: Infinity,
      //     maxAsyncRequests: Infinity,

      //     cacheGroups: {
      //       reactReduxVendor: {
      //         test: /[\\/]node_modules[\\/](react-redux)[\\/]/,
      //         name: 'reactreduxvendor',
      //       },
      //       reactVendor: {
      //         test: /[\\/]node_modules[\\/](react)[\\/]/,
      //         name: 'reactvendor',
      //       },
      //       reactDOMVendor: {
      //         test: /[\\/]node_modules[\\/](react-dom)[\\/]/,
      //         name: 'reactDOMvendor',
      //       },
      //       reduxVendor: {
      //         test: /[\\/]node_modules[\\/](redux|redux-thunk)[\\/]/,
      //         name: 'reduxvendor',
      //       },
      //       reactRouterVendor: {
      //         test: /[\\/]node_modules[\\/](react-router|react-router-dom)[\\/]/,
      //         name: 'reactroutervendor',
      //       },
      //       vendor: {
      //         test: /[\\/]node_modules[\\/]/,
      //         name(module) {
      //           // get the name. E.g. node_modules/packageName/not/this/part.js
      //           // or node_modules/packageName
      //           const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
      //           // npm package names are URL-safe, but some servers don't like @ symbols
      //           return `${packageName.replace('@', '')}`;
      //         },
      //       },
      //     },
      //   },
    },

    resolve: {
      extensions: ["jsx", ".tsx", ".ts", ".js"],
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                plugins: [
                  "@babel/plugin-transform-runtime",
                  "@babel/plugin-proposal-logical-assignment-operators",
                ],
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: true,
                cacheCompression: false,
                compact: false,
              },
            },
          ],
        },

        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: "awesome-typescript-loader",
        },

        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              // active these options, while you want to use css files as modules.
              // so the files will be imported like a js module.
              // eg: import classes from "./style.css".
              // access to the class using => classes.className.
              options: {
                // while using the style as modules, it would be recommended to use camelcase format to name classes.
                // modules: true,
              },
            },
          ],
        },

        {
          test: /\.(jpe?g|png|gif|svg)$/,
          loader: "file-loader",
          options: {
            name: "assets/[name]-[contenthash].[ext]",
            limit: 10000,
          },
        },
      ],
    },

    plugins: [
      new webpack.HashedModuleIdsPlugin(),
      new InterpolateHtmlPlugin({
        PUBLIC_URL: "public/",
      }),
      new HtmlWebpackPlugin({
        // if you want to provide your own file, add this line of code to detect the path of the file.
        // otherwise let it empty.
        template: path.resolve("./index.html"),
        ...(argv.mode === "production"
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
          : null),
      }),

      // import these files as cdn, in order to decrease the bundle size.
      // rather than supply them in bundle, they get served as cdn(link).
      // new DynamicCdnWebpackPlugin({
      //   env: 'production',
      //   only: ['react', 'react-dom', 'react-redux', 'redux', 'react-router-dom', 'redux-thunk', 'axios'],
      // }),

      new ManifestPlugin({
        fileName: "asset-manifest.json",
        publicPath: publicUrlOrPath,
        generate: (seed, files, entrypoints) => {
          const manifestFiles = files.reduce((manifest, file) => {
            manifest[file.name] = file.path;
            return manifest;
          }, seed);
          const entrypointFiles = entrypoints.main.filter(
            (fileName) => !fileName.endsWith(".map")
          );

          return {
            files: manifestFiles,
            entrypoints: entrypointFiles,
          };
        },
      }),

      // Moment.js is an extremely popular library that bundles large locale files
      // by default due to how webpack interprets its code. This is a practical
      // solution that requires the user to opt into importing specific locales.
      // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      // You can remove this if you don't use Moment.js:
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

      ...(argv.mode === "production"
        ? [
            new WorkboxWebpackPlugin.GenerateSW({
              clientsClaim: true,
              exclude: [/\.map$/, /asset-manifest\.json$/],
              importWorkboxFrom: "cdn",
              navigateFallback: publicUrlOrPath + "index.html",
              navigateFallbackBlacklist: [
                // Exclude URLs starting with /_, as they're likely an API call
                new RegExp("^/_"),
                // Exclude any URLs whose last part seems to be a file extension
                // as they're likely a resource and not a SPA route.
                // URLs containing a "?" character won't be blacklisted as they're likely
                // a route with query params (e.g. auth callbacks).
                new RegExp("/[^/?]+\\.[^/]+$"),
              ],
            }),
          ]
        : []),

      new MiniCssExtractPlugin({
        filename: "static/css/[name][contenthash].css",
        chunkFilename: "static/css/[id].css",
      }),

      ...(argv.mode === "production"
        ? []
        : [new webpack.HotModuleReplacementPlugin()]),
    ],

    // Some libraries import Node modules but don't use them in the browser.
    // Tell webpack to provide empty mocks for them so importing them works.
    node: {
      module: "empty",
      dgram: "empty",
      dns: "mock",
      fs: "empty",
      http2: "empty",
      net: "empty",
      tls: "empty",
      child_process: "empty",
    },
  };
};

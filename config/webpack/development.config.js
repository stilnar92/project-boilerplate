const {resolve} = require("path")

// webpack plugins
const {
    LoaderOptionsPlugin,
    EnvironmentPlugin,
    HotModuleReplacementPlugin,
    NamedModulesPlugin,
} = require("webpack")
const merge = require("webpack-merge")
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard();

require("dotenv").config();

const {config, DIST} = require("./common")

module.exports = merge(config, {
    profile: true,
    devtool: "cheap-module-eval-source-map",
    mode: "development",

    output: {
        filename: "[name].js",
        publicPath: "/",
        path: DIST,
        pathinfo: true,
    },

    performance: false,

    plugins: [
        new LoaderOptionsPlugin({
            debug: true,
            minimize: false,
        }),

        new EnvironmentPlugin({
            NODE_ENV: "development",
        }),

        new NamedModulesPlugin(),
        new HotModuleReplacementPlugin(),
        new DashboardPlugin(),
    ],

    stats: false,

    devServer: {
        contentBase: resolve(__dirname, "..", "..", "public"),
        port: 3001,
        hot: true,
        stats: "minimal",
        historyApiFallback: true,
    },
})
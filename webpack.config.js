const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry:{
        app : "./src/index.js",
    },
    devtool: "source-map", 
    devServer : {
        contentBase : "./dist"
    },
    output : {
        filename : "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins : [
        new CleanWebpackPlugin(["dist"]),
        new HtmlWebpackPlugin({
            title : "CHIEN WEN",
            template : "./src/index.html"
        }) 
    ],
    module : {
        rules: [
            {
                test: /\.css$/,  
                use : [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,  
                use : [
                    "file-loader"
                ]
            },
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["env"]
                }
            }
        ]
    }
};


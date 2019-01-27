// Configure Babel loader
const configureBabel = (browserList) => {
    return {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    "@babel/preset-env",
                    "@babel/preset-react"
                ]
            },
        },
    };
};

module.exports = {
    configureBabel
};
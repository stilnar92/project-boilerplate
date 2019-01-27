// Configure Babel loader
const configureBabel = (browserList) => {
    return {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        "@babel/env",
                        {
                            modules: false,
                            useBuiltIns: "usage",
                            targets: {
                                browsers: browserList,
                            }
                        },
                    ],
                    "@babel/react",
                ],
                plugins: [
                    ["@babel/plugin-proposal-class-properties", { loose: false }],
                    "@babel/proposal-export-namespace-from",
                    "@babel/syntax-dynamic-import",
                    "@babel/plugin-proposal-json-strings",
                ],
                env: {
                    production: {
                        plugins: [
                            // "@babel/transform-react-constant-elements",
                            // "@babel/transform-react-inline-elements",
                            [
                                "transform-react-remove-prop-types",
                                {
                                    removeImport: true,
                                },
                            ],
                        ],
                    },
                    development: {
                        plugins: [
                            "react-hot-loader/babel",
                            [
                                "styled-components",
                                {
                                    displayName: true,
                                    fileName: false,
                                },
                            ],
                        ],
                    },
                    test: {
                        presets: [["@babel/env"], "@babel/react"],
                    },
                },
            },
        },
    };
};

module.exports = {
    configureBabel
};
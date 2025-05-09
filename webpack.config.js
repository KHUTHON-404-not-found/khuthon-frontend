const path = require('path');
module.exports = {
    entry: {
        app: ["./src/index.js"]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'build')
    },
    mode: 'none',
    
    module: {
        rules: [
            {
                test: /\.p?css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "postcss-loader"}  // postcss 적용
                ],
            }
        ]
    },
};
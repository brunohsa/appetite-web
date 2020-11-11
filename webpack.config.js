module.exports = {
    entry: './app/js/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        contentBase: './public',
        host: 'localhost',
        port: 3001,
        hot: true,
        writeToDisk: true,
        historyApiFallback: true,
        inline: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include : __dirname,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env','@babel/preset-react']
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,  
                use: [{
                    loader: 'url-loader',
                    options: { 
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    } 
                }]
            },
            {
                test: /\.mp4$/,
                use: 'file-loader?name=videos/[name].[ext]',
            }
        ]
    }
}
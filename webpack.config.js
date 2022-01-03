// 2. necesitamos importar el HtmlWebpackPlugin y pasamos a modificar
// los plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

// aquí veremos las configuraciónes de como queremos que funcione webpack
// verán módulos con sus reglas, optimizaciones y plugins

module.exports = {
    mode: 'development',

    output: {
        // limpia, borra todo y lo vuelve a crear
        clean: true
    },

    module: {
        rules: [
            {// 1. expresion regular/\.exp/: nos sirve para buscar si un string hace match 
                // con la expresión regular /\.html$/ el $ sirve para que busque todos los html
                // si al final agregamos una i /\.html$/i es para que sea insensible a UpperCase o lowerCase
                test: /\.html$/, //apuntar a todos los archivos html, con la exp regular.
                // cuando encuentra archivos html lo que queremos es que llame al loader
                loader: 'html-loader',
                // source en false, en caso se mueva un archivo o atributo también lo movería
                // de manera automática, entonces es mejor hacerlo manual y dejarlo en falso.
                options: {
                    sources:false
                },
            },
            {
                // expresion regular/\.exp/: en este caso se aplica a archivos css
                test: /\.css$/i,
                // cuando evalúa reglas, y la aplica, deja de aplicar las siguientes
                // por lo cual excluimos de esta regla el styles.css
                exclude: /styles.css$/,
                // vamos a usar los 2 paquetes que hemos instalado
                use: ["style-loader", "css-loader"],
            },
            {// pedimos que busque el archivo styles.css
                test: /styles.css$/,
             // usamos el minicss extract plugin y el css loader 
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            { // que busque archivos png, jpe, jpg, gif
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
            }
        ]
    },

    optimization: {},

    plugins: [ // arreglo 
    // configuramos una nueva instancia del HtmlWebpackPlugin con esto se crea el archivo index.html en el dist
        new HtmlWebpackPlugin({
            // configuraciones dentro del webpack
            title: 'Mi Webpack App',// cambia el titulo
            //filename: 'index.html'// cambia el nombre de archivo
            // template es el archivo en el cual queremos que se base el archivo creado
            template: './src/index.html'
        }),
    //configuramos una nueva instancia del MiniCss con esto se crea el archivo en el dist
        new MiniCssExtractPlugin({
          // fullhash crea un archivo con hash y cada vez que se cree el build y el css cambie, 
          // va a crearse un nuevo hash, con esto los nav web no mantengan en caché el archivo
          // '[name].[fullhash].css'
            filename: 'styles.css',
          // le pedimos que ignore el orden de importaciones de css  
            ignoreOrder: false,
        }),

        new CopyPlugin({
            patterns: [// desde src/assets y el destino será el mismo assets
              { from: "src/assets/", to: "assets/" },
            ],
          }),
    ],
}
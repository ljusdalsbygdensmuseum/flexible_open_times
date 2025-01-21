const defaults = require( '@wordpress/scripts/config/webpack.config' );
const path          = require( 'path' );

module.exports = {
  ...defaults,
  entry: {
    settings: path.resolve( process.cwd(), 'src', 'settings.tsx' ),
    extra_open: path.resolve( process.cwd(), 'src', 'metabox-extra.tsx' ),
    closed: path.resolve( process.cwd(), 'src', 'metabox-closed.tsx' )
  },
  output: {
    filename: '[name].js',
    path: path.resolve( process.cwd(), 'build' ),
  },  
  module: {
    ...defaults.module,
    rules: [
      ...defaults.module.rules,
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
              transpileOnly: true,
            }
          }
        ]        
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.tsx', ...(defaults.resolve ? defaults.resolve.extensions || ['.js', '.jsx'] : [])]
  }
};
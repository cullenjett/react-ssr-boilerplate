const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');
const fs = require('fs');

const { getAppEnv } = require('./env');

const env = getAppEnv();
const { PUBLIC_URL = '' } = env.raw;

const resolvePath = relativePath => path.resolve(__dirname, relativePath);
const useTs = fs.existsSync(path.resolve(process.cwd(), 'tsconfig.json'));

if (env.raw.NODE_ENV !== 'production') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

module.exports = {
  mode: 'production',
  target: 'node',
  node: {
    __dirname: true
  },
  entry: './server/app.js',
  output: {
    path: resolvePath('../build'),
    filename: 'server.js',
    publicPath: PUBLIC_URL + '/',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                [
                  'css-modules-transform',
                  {
                    camelCase: true,
                    extensions: ['.css', '.scss'],
                    generateScopedName: '[hash:base64]',
                    ignore: 'src/styles'
                  }
                ],
                'dynamic-import-node'
              ]
            }
          },
          useTs && {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ].filter(Boolean)
      },
      {
        test: /\.s?css$/,
        exclude: [resolvePath('../src/styles')],
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true
            }
          },
          'sass-loader',
          'import-glob-loader'
        ]
      }
    ]
  },
  plugins: [
    useTs &&
      new ForkTsCheckerWebpackPlugin({
        checkSyntacticErrors: true,
        compilerOptions: {
          module: 'esnext',
          moduleResolution: 'node',
          resolveJsonModule: true,
          isolatedModules: true,
          noEmit: true,
          jsx: 'preserve',
          skipLibCheck: true
        },
        reportFiles: [
          '**',
          '!**/*.json',
          '!**/__tests__/**',
          '!**/?(*.)(spec|test).*',
          '!**/src/setupProxy.*',
          '!**/src/setupTests.*'
        ],
        watch: [resolvePath('../server')],
        silent: true,
        formatter: typescriptFormatter
      })
  ].filter(Boolean),
  externals: [nodeExternals()]
};

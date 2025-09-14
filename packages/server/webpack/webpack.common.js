const { resolve } = require('path');

module.exports = {
  entry: {
    index: ['./src/index.js'],
  },
  output: {
    filename: '[name].js',
    path: resolve('dist'),
  },
  target: 'node',
  node: {
    __filename: false,
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    // Map Node.js scheme imports (e.g., 'node:net') to core modules for older webpack versions
    alias: {
      'node:assert': 'assert',
      'node:buffer': 'buffer',
      'node:child_process': 'child_process',
      'node:cluster': 'cluster',
      'node:console': 'console',
      'node:constants': 'constants',
      'node:crypto': 'crypto',
      'node:dgram': 'dgram',
      'node:dns': 'dns',
      'node:domain': 'domain',
      'node:events': 'events',
      'node:fs': 'fs',
      'node:http': 'http',
      'node:http2': 'http2',
      'node:https': 'https',
      'node:module': 'module',
      'node:net': 'net',
      'node:os': 'os',
      'node:path': 'path',
      'node:perf_hooks': 'perf_hooks',
      'node:process': 'process',
      'node:punycode': 'punycode',
      'node:querystring': 'querystring',
      'node:readline': 'readline',
      'node:repl': 'repl',
      'node:stream': 'stream',
      'node:string_decoder': 'string_decoder',
      'node:timers': 'timers',
      'node:tls': 'tls',
      'node:tty': 'tty',
      'node:url': 'url',
      'node:util': 'util',
      'node:v8': 'v8',
      'node:vm': 'vm',
      'node:zlib': 'zlib',
    },
  },
};

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Add other plugins here if you have them
    // @native-html/render ships htmlparser2 ESM with `export * as x` syntax,
    // which must be transformed before the commonjs plugin rewrites exports.
    '@babel/plugin-transform-export-namespace-from',
    [
      'module-resolver',
      {
        root: ['.'], // Can be './src' if all your source code is in src
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.json',
        ],
        alias: {
          '@': './src', // This must match the structure you defined in tsconfig.json paths
          // If baseUrl in tsconfig is "." and paths is "@/*": ["src/*"],
          // then alias "@" to "./src" here.
        },
      },
    ],
  ],
};

const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {withRozenite} = require('@rozenite/metro');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);
const defaultBlockList = defaultConfig.resolver.blockList;
const websiteBlock = /[\\/]website[\\/].*/;
const nitroFetchStub = path.resolve(
  __dirname,
  'scripts/rozenite/nitro-fetch-stub.js',
);

const config = {
  resolver: {
    // website/ is a separate Astro app with its own node_modules.
    blockList: Array.isArray(defaultBlockList)
      ? [...defaultBlockList, websiteBlock]
      : [defaultBlockList, websiteBlock],
    // Rozenite requires react-native-nitro-fetch optionally. Metro drops
    // unresolved optional requires from the module map, which shifts the
    // indices and crashes the network plugin. Point it at a null stub instead.
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName === 'react-native-nitro-fetch') {
        try {
          return context.resolveRequest(context, moduleName, platform);
        } catch {
          return {type: 'sourceFile', filePath: nitroFetchStub};
        }
      }
      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

module.exports = withRozenite(mergeConfig(defaultConfig, config), {
  enabled: process.env.WITH_ROZENITE === 'true',
});

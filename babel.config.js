module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@components': './src/components',
            '@pages': './src/pages',
            '@router': './src/router',
            '@hooks': './src/hooks',
            '@theme': './src/theme',
            '@state': './src/state',
            '@utils': './src/utils',
            '@service': './src/service',
            '@constants': './src/constants',
          },
        },
        'react-native-reanimated/plugin'
      ],
    ],
  };
};
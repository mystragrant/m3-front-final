module.exports = function (config) {
  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /.(m?js|ts|tsx)$/,
          enforce: "pre",
          use: ["source-map-loader"],
        },
      ],
    },
    plugins: [
      ...config.plugins,
      // new ProvidePlugin({
      //   // process: "process/browser",
      // }),
    ],
    resolve: {
      ...config.resolve,
      fallback: {
        fs: false,
        os: false,
        path: false,
        stream: require.resolve("stream-browserify"),
        assert: require.resolve("assert/"),
        buffer: require.resolve("buffer/"),
        // path: require.resolve("path-browserify"),
        // os: require.resolve("os-browserify/browser"),
      },
    },
    ignoreWarnings: [/Failed to parse source map/],
  };
};

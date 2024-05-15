module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".tsx", ".ts", ".js", ".json", ".jsx"],
          root: ["./src"],
          alias: {
            "@components": "./src/components",
            "@styles": "./src/style",
            "@contexts": "./src/contexts",
            // Tambahkan alias lain yang Anda butuhkan
          },
        },
      ],
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blocklist: null,
          allowlist: null,
          blacklist: null, // DEPRECATED
          whitelist: null, // DEPRECATED
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
      "react-native-paper/babel",
      "react-native-reanimated/plugin",
    ],
  };
};

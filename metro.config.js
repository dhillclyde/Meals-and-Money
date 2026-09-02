const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
// let metro treat the two app bundles as assets we can hand to the WebView
config.resolver.assetExts.push('html');
module.exports = config;

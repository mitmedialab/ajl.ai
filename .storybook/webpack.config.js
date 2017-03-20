// For more information on Storybook's webpack configuration, refer the docs:
// https://getstorybook.io/docs/configurations/custom-webpack-config

const path = require('path');
const webpackConfig = require('../webpack.config');

const projectRoot = path.resolve(__dirname, '../');

// Storybook still uses Webpack 1 under the hood! This means we have to map
// our Webpack 2 config back to use Webpack 1 syntax; and since Storybook
// handles the Babel / JSX parsing for us, this means we also need to pick
// out the rules relevant to our non-JS styles & files loaders.
const styleAndImageRules = webpackConfig.module.rules
  // We filter our rules list down with a simple file-type regex test to
  // whitelist the loader tests we want to pull in to Storybook:
  .filter(rule => /png|svg|jpg|gif|styl/i.test(rule.test.toString()))
  // This map statement converts _the most basic_ Webpack 2 loader config
  // objects into something Webpack 1 can understand; it works here because
  // this project does not get too tricky with loaders, but could break if
  // the base project Webpack configuration is substantially modified.
  // TODO: Rip this out ASAP as soon as Storybook upgrades to Webpack 2!
  .map(rule => ({
    test: rule.test,
    loaders: rule.use.map((loader) => {
      if (typeof loader === 'string') {
        // String loader values are passed through as-is
        return loader;
      }
      // Otherwise, make a string out of the loader options object and
      // add it to the loader name. Loaders can conveniently accept options
      // as a JSON string: https://webpack.github.io/docs/using-loaders.html
      return `${loader.loader}?${JSON.stringify(loader.options)}`;
    }),
    // Since this file is not the project root, augment each rule with
    // an include path specifying the project's root directory
    include: projectRoot,
  }));

module.exports = {
  module: {
    loaders: styleAndImageRules,
  },
};

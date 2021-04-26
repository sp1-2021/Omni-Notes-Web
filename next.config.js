const withPlugins = require('next-compose-plugins');

const nextTranslate = require('next-translate');

const config = {
  future: {
    webpack5: true,
  },
};

module.exports = withPlugins([[nextTranslate]], config);

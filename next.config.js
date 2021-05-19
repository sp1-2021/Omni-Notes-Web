const withPlugins = require('next-compose-plugins');

const nextTranslate = require('next-translate');

const config = {
  target: 'serverless',
  future: {
    webpack5: false,
  },
};

module.exports = withPlugins([[nextTranslate]], config);

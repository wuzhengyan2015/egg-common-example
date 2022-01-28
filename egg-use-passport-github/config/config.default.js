/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1643334895253_8170';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.passportGithub = {
    key: '9ca0ae90c854888c1be3',
    secret: '51df1b2fa90cd29dd471a5fdb83627d1bc8aa776',
    // callbackURL: '/passport/github/callback',
    // proxy: false,
  };

  return {
    ...config,
    ...userConfig,
  };
};

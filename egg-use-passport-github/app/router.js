'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  app.passport.mount('github');

  router.get('/', controller.home.index);
};

'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/download', controller.home.download);
  router.get('/download-image', controller.home.downloadImage);
};

'use strict';

/** @type Egg.EggPlugin */
exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.passportLocal = {
  enable: true,
  package: 'egg-passport-local',
};

exports.nunjunks = {
  enable: true,
  package: 'egg-view-nunjucks',
};

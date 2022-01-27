'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const mockUser = {
    id: '123',
    name: 'Admin3',
  };
  app.passport.verify(async (ctx, user) => {
    const { username, password } = user;
    if (username === 'admin' && password === '123456') {
      return mockUser;
    }
    return null;
  });

  app.passport.serializeUser(async (ctx, user) => user && user.id);
  // this user is userId passed from `serializeUser`
  app.passport.deserializeUser(async (ctx, user) => (user ? mockUser : null));

  router.get('/', controller.home.index);
  router.get('/admin', controller.home.admin);
  router.get('/login', controller.home.login);
  router.post('/login', app.passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login',
  }));
  router.get('/logout', controller.home.logout);
};

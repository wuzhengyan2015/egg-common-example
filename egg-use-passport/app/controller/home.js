'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('page/index.html');
  }

  async admin() {
    const { ctx } = this;
    if (ctx.isAuthenticated()) {
      await ctx.render('page/admin.html', ctx.user);
    } else {
      ctx.session.returnTo = ctx.path;
      await ctx.render('page/login.html');
    }
  }

  async login() {
    const { ctx } = this;
    await ctx.render('page/login.html');
  }

  async logout() {
    const ctx = this.ctx;

    ctx.logout();
    ctx.redirect(ctx.get('referer') || '/');
  }
}

module.exports = HomeController;

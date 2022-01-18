'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('page/form.html');
  }

  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const reader = fs.createReadStream(file.filepath);
    const name = 'app/public/upload/' + path.basename(file.filename);
    const writer = fs.createWriteStream(name);
    try {
      await reader.pipe(writer);
    } finally {
      await ctx.cleanupRequestFiles();
    }

    ctx.body = {
      url: '/public/upload/' + path.basename(file.filename),
      requestBody: ctx.request.body,
    };
  }
}

module.exports = HomeController;

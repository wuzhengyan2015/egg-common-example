'use strict';

const Controller = require('egg').Controller;
const fs = require('mz/fs');
const path = require('path');


class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('page/form.html');
  }

  async form() {
    const { app, ctx } = this;
    const file = ctx.request.files[0];
    const destPath = `app/${app.config.uploadPath}/${path.basename(file.filename)}`;
    const isExists = await fs.exists(path.dirname(destPath));
    if (!isExists) {
      await fs.mkdir(path.dirname(destPath), { recursive: true });
    }
    const reader = fs.createReadStream(file.filepath);
    const writer = fs.createWriteStream(destPath);
    try {
      await reader.pipe(writer);
    } finally {
      await ctx.cleanupRequestFiles();
    }

    ctx.redirect(`/${app.config.uploadPath}/${path.basename(file.filename)}`);
  }

  async ajax() {
    const { app, ctx } = this;
    const file = ctx.request.files[0];
    const destPath = `app/${app.config.uploadPath}/${path.basename(file.filename)}`;
    const isExists = await fs.exists(path.dirname(destPath));
    if (!isExists) {
      await fs.mkdir(path.dirname(destPath), { recursive: true });
    }
    const reader = fs.createReadStream(file.filepath);
    const writer = fs.createWriteStream(destPath);
    try {
      await reader.pipe(writer);
    } finally {
      await ctx.cleanupRequestFiles();
    }

    ctx.body = {
      url: `/${app.config.uploadPath}/${path.basename(file.filename)}`,
      requestBody: ctx.request.body,
    };
  }
}

module.exports = HomeController;

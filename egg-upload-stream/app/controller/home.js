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
    const stream = await ctx.getFileStream();
    const destFolder = `app/${app.config.uploadPath}`;
    const isExists = await fs.exists(destFolder);
    if (!isExists) {
      await fs.mkdir(destFolder, { recursive: true });
    }
    const writer = fs.createWriteStream(`${destFolder}/${path.basename(stream.filename)}`);
    try {
      await stream.pipe(writer);
    } finally {
      await ctx.cleanupRequestFiles();
    }

    ctx.redirect(`/${app.config.uploadPath}/${path.basename(stream.filename)}`);
  }

  async multiple() {
    const { app, ctx } = this;
    const destFolder = `app/${app.config.uploadPath}`;
    const isExists = await fs.exists(destFolder);
    if (!isExists) {
      await fs.mkdir(destFolder, { recursive: true });
    }

    const parts = ctx.multipart({ autoFields: true });
    const result = [];
    let stream;
    try {
      while ((stream = await parts()) != null) {
        const writer = fs.createWriteStream(`${destFolder}/${path.basename(stream.filename)}`);
        await stream.pipe(writer);
        result.push(`/${app.config.uploadPath}/${path.basename(stream.filename)}`);
      }
    } finally {
      await ctx.cleanupRequestFiles();
    }

    ctx.body = {
      result,
      requestBody: ctx.request.body,
    };
  }
}

module.exports = HomeController;

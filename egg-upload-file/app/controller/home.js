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
    const destFolder = `app/${app.config.uploadPath}`;
    const isExists = await fs.exists(destFolder);
    if (!isExists) {
      await fs.mkdir(destFolder, { recursive: true });
    }
    const reader = fs.createReadStream(file.filepath);
    const writer = fs.createWriteStream(`${destFolder}/${path.basename(file.filename)}`);
    try {
      reader.pipe(writer);
      await new Promise(resolve => {
        reader.on('end', () => { resolve(); });
      });
    } finally {
      await ctx.cleanupRequestFiles();
    }

    ctx.redirect(`/${app.config.uploadPath}/${path.basename(file.filename)}`);
  }

  async ajax() {
    const { app, ctx } = this;
    const file = ctx.request.files[0];
    const destFolder = `app/${app.config.uploadPath}`;
    const isExists = await fs.exists(destFolder);
    if (!isExists) {
      await fs.mkdir(destFolder, { recursive: true });
    }
    const reader = fs.createReadStream(file.filepath);
    const writer = fs.createWriteStream(`${destFolder}/${path.basename(file.filename)}`);
    try {
      reader.pipe(writer);
      await new Promise(resolve => {
        reader.on('end', () => { resolve(); });
      });
    } finally {
      await ctx.cleanupRequestFiles();
    }

    ctx.body = {
      url: `/${app.config.uploadPath}/${path.basename(file.filename)}`,
      requestBody: ctx.request.body,
    };
  }

  async multiple() {
    const { app, ctx } = this;
    const destFolder = `app/${app.config.uploadPath}`;
    const isExists = await fs.exists(destFolder);
    if (!isExists) {
      await fs.mkdir(destFolder, { recursive: true });
    }

    const result = [];
    try {
      for (const file of ctx.request.files) {
        const reader = fs.createReadStream(file.filepath);
        const writer = fs.createWriteStream(`${destFolder}/${path.basename(file.filename)}`);
        reader.pipe(writer);
        await new Promise(resolve => {
          reader.on('end', () => { resolve(); });
        });
        result.push(`/${app.config.uploadPath}/${path.basename(file.filename)}`);
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

'use strict';

const Controller = require('egg').Controller;
const fs = require('mz/fs');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('page/home.html');
  }

  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const body = ctx.request.body;
    const destFolder = `app/public/slice/${file.filename.split('.')[0]}`;
    const isExists = await fs.exists(destFolder);
    if (!isExists) {
      await fs.mkdir(destFolder, { recursive: true });
    }
    const writer = fs.createWriteStream(`${destFolder}/${body.part}.${file.filename.split('.')[1]}`);
    const reader = fs.createReadStream(file.filepath);
    try {
      await reader.pipe(writer);
    } finally {
      await ctx.cleanupRequestFiles();
    }

    ctx.body = 'upload';
  }

  async merge() {
    const { ctx } = this;
    const filename = ctx.request.body.filename;
    const destFolder = `app/public/slice/${filename.split('.')[0]}`;
    const chuckPaths = await fs.readdir(destFolder);
    chuckPaths.sort((a, b) => parseInt(a) - parseInt(b));
    for (let i = 0; i < chuckPaths.length; i++) {
      const path = chuckPaths[i];
      const size = 1 * 1024 * 1024;
      const reader = fs.createReadStream(`${destFolder}/${path}`);
      const writer = fs.createWriteStream(`app/public/upload/${filename}`, {
        start: i * size,
        end: (i + 1) * size,
      });
      await reader.pipe(writer);
    }
    ctx.body = 'merge';
  }
}

module.exports = HomeController;

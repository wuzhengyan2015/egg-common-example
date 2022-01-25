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
      reader.pipe(writer);
      await new Promise(resolve => {
        reader.on('end', () => { resolve(); });
      });
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
    const writer = fs.createWriteStream(`app/public/upload/${filename}`);
    for (let i = 0; i < chuckPaths.length; i++) {
      const path = chuckPaths[i];
      const reader = fs.createReadStream(`${destFolder}/${path}`);
      reader.pipe(writer, { end: false });
      await new Promise(resolve => {
        reader.on('end', () => { resolve(); });
      });
    }
    writer.end();
    ctx.body = 'merge';
  }
}

module.exports = HomeController;

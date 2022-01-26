# upload-file

## Upload file by using egg file mode

**notice**: when form sets ``enctype="multipart/form-data"``, _csrf injected by nunjucks will invalid, you should add _csrf in other way(url or header).

1. set config
```js
config.multipart = {
  mode: 'file',
};
```

2. read from ctx
```js
const files = ctx.request.files
```

see [deatil](https://eggjs.org/zh-cn/basics/controller.html#%E8%8E%B7%E5%8F%96%E4%B8%8A%E4%BC%A0%E7%9A%84%E6%96%87%E4%BB%B6)

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org
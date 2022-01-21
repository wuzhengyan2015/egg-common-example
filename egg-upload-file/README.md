# upload-file

when form sets ``enctype="multipart/form-data"``, _csrf injected by nunjucks will invalid, you should add _csrf in other way(url or header).

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
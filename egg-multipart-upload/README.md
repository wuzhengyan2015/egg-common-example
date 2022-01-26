# multipart-upload

## Simple implementation of multipart upload

### front end code

1. use file ``slice`` method to slice file
```js
function sliceFile(file) {
  const chunkList = [];
  const chunkSize = 5 * 1024;
  for (let i = 0; i < file.size; i += chunkSize) {
    const chunk = file.slice(i, i + chunkSize);
    chunkList.push(chunk);
  }
  return chunkList;
}
```
2. iterate chunk list, use FormData to append index and file, then upload
```js
const chunkList = sliceFile(file);

const requests = [];
chunkList.forEach((item, i) => {
  const formData = new FormData();
  formData.append('part', i + 1);
  formData.append('file', item, file.name);
  const promise = window.axios(`/upload?_csrf=${_csrf}`, {
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  requests.push(promise);
});
```
3. when all chunks have uploaded, call merge to notify server to merge chunks 

```js
Promise.all(requests).then(() => {
    window.axios(`/merge?_csrf=${_csrf}`, {
      method: 'POST',
      data: {
        filename: file.name,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
```

### node server 
1. upload api: save to chuck into one folder and use index to name the chuck
```js
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
```
2. merge api: iterate the chunk folder, concat all the chunk
```js
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
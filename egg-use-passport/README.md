# use-passport

## use passport-local

egg-passport-local don't have callback params, so you can write yourself or design your login api yourself.

passport is recommended when you need oauth.

1. plugin config
```js
exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.passportLocal = {
  enable: true,
  package: 'egg-passport-local',
};
```

2. setting verify, serializeUser, deserializeUser
```js
app.passport.verify(async (ctx, user) => {
  const { username, password } = user;
  if (username === 'admin' && password === '123456') {
    return mockUser;
  }
  return null;
});

app.passport.serializeUser(async (ctx, user) => user && user.id);
// this user is userId passed from `serializeUser`
app.passport.deserializeUser(async (ctx, user) => (user ? mockUser : null));
```

3. use it
```js
router.post('/login', app.passport.authenticate('local', {
  successRedirect: '/admin',
  failureRedirect: '/login',
}));
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
const Koa = require('koa')
const static = require('koa-static')
const Router = require('koa-router')
const koaNunjucks = require('koa-nunjucks-2')
const koaBody = require('koa-body')
const path = require('path')
const fs = require('fs')

const app = module.exports = new Koa()

app.use(static(__dirname, 'public'))
app.use(koaNunjucks({
  ext: 'html',
  path: path.join(__dirname, 'views'),
  nunjucksConfig: {
    trimBlocks: true
  }
}))
app.use(koaBody({
  multipart: true
}))

const router = new Router()
const homeRouter = new Router()
const apiRouter = new Router()

homeRouter.get('/', async (ctx, next) => {
  await ctx.render('form')
})
apiRouter.post('/upload', (ctx, next) => {
  const file = ctx.request.files.file
  const reader = fs.createReadStream(file.path)
  const filePath = path.join(__dirname, 'public', file.name)
  const writer = fs.createWriteStream(filePath)
  reader.pipe(writer)
  ctx.body = `/public/${file.name}`
})

router.use('/', homeRouter.routes())
router.use('/api', apiRouter.routes())

app
  .use(router.routes())
  .use(router.allowedMethods())

app.use((err, ctx, next) => {
  console.log(err)
})

if (!module.parent) {
  app.listen(3000, () => {
    console.log('listen 3000')
  })
}

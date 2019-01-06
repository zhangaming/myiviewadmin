const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const app = new Koa();

app.use(views(path.join(__dirname,'./view'),{
  extension:'ejs'
}))


app.use(async(ctx)=>{
  let title = 'Hello JSPang'
  await ctx.render('index',{title})
})

app.listen(3000,()=>{
  console.log('[demo] server is starting at port 3000')
})
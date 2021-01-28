import express from 'express'
import pug from 'pug'
import path from 'path'
import fs from 'fs'

const app = express()
app.use((req, res, next)=> {
  console.log('my middleware', req.path);
  next();
})
app.use(express.static(path.join(__dirname, 'static')))
app.get('/:articleId', (req, res) => {
  const articleName = `article${req.params.articleId}.readme`
  const content = fs.readFileSync(path.join(__dirname, `articles/${articleName}`))
  res.send(pug.renderFile('src/views/layout.pug', {article: content}))
})

app.listen(8081, () => {
  console.log('server started at 8081')
})
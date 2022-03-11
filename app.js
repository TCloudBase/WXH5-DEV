const express = require('express')
const path = require('path')
const fs = require('fs')
const https = require('https')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

app.use(createProxyMiddleware('/__wx__/', {
  target: 'https://servicewechat.com/wxa-qbase',
  changeOrigin: true,
  pathRewrite: {
    '^/__wx__': ''
  }
}))

app.get('/', async function (req, res, next) {
  res.sendFile(path.join(__dirname, './views/index.html'))
})

var privateKey = fs.readFileSync(path.join(__dirname, './ssl/domain.key'), 'utf8')
var certificate = fs.readFileSync(path.join(__dirname, './ssl/domain.crt'), 'utf8')
var credentials = { key: privateKey, cert: certificate }

var server = https.createServer(credentials, app)

server.listen(443, function () {
  console.log('启动成功！')
})

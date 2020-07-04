const fs = require('fs')
const path = require('path')
const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')
const { redirectToHTTPS } = require('express-http-to-https')
const chalk = require('chalk')

const TARGET_PORT = process.env.PORT || 8080
const IS_DEV = process.env.NODE_ENV === 'development'

const indexTemplatePath = path.resolve(__dirname, './public/index.html')
const indexTemplate = fs.readFileSync(indexTemplatePath, 'utf-8')

const vueSSRServerBundle = require('./dist/vue-ssr-server-bundle.json')
const vueSSRClientManifest = require('./dist/vue-ssr-client-manifest.json')

async function initServer () {
  const server = express()

  // Redirect HTTP to HTTPS (ignore localhost:)
  server.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301))

  const bundleRenderer = createBundleRenderer(vueSSRServerBundle, {
    template: indexTemplate,
    clientManifest: vueSSRClientManifest,
    runInNewContext: false
  })

  const resources = ['/js', '/img', '/css', '/manifest.json', '/robots.txt', '/favicon.ico']

  resources.forEach((url) => {
    server.use(url, express.static(path.resolve(__dirname, `./dist${url}`)))
  })

  server.get('*', async (req, res, next) => {
    res.setHeader('Content-Type', 'text/html')

    const context = {
      title: 'App | ',
      url: req.url
    }

    try {
      const html = await bundleRenderer.renderToString(context)

      res
        .status(context.HTTPStatus || 200)
        .send(html)
    }
    catch (error) {
      console.log(
        chalk.red(`RENDERING ERROR AT : ${req.url}`),
        chalk.red('ERROR \n', JSON.stringify(error))
      )

      if (IS_DEV) {
        res.send({ error })
      }
      else {
        res.status(500).end('500 | Internal Server Error')
      }
    }
  })

  server.listen((TARGET_PORT), () => {
    console.log(
      chalk.green('\n\nINITAL START SUCCESSFUL '),
      chalk.green(`\nServer started at ${chalk.red(`http://localhost:${TARGET_PORT}`)}\n`)
    )
  })
}

initServer()

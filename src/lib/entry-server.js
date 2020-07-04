import { createApp } from '../app'

export default context => {
  return new Promise((resolve, reject) => {
    const {
      app,
      router
    } = createApp()

    const { url } = context
    const { fullPath } = router.resolve(url).route

    if (fullPath !== url) {
      /* eslint-disable-next-line */
      return reject({ 
        url: fullPath
      })
    }

    router.push(url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()

      if (!matchedComponents.length) {
        /* eslint-disable-next-line */
        return reject({ 
          code: 404
        })
      }

      resolve(app)
    }, reject)
  })
}

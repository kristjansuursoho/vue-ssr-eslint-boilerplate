import { createApp } from '../app'

const {
  app,
  router
} = createApp()

router.onReady(() => {
  window.$router = router

  app.$mount('#app')
})

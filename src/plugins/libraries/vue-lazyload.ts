import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import loadImgSrc from '@/assets/images/icon_loading.svg'

// https://github.com/hilongjw/vue-lazyload/issues/395#issuecomment-526487581
// https://github.com/hilongjw/vue-lazyload/issues/380#issuecomment-514268359
Vue.prototype.destroy = Vue.prototype.$destroy
Vue.use(VueLazyload, {
  preLoad: 1.1,
  attempt: 1,
  observer: true,
  lazyComponent: true,

  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1
  },
  loading: loadImgSrc
})

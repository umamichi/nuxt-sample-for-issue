import NuxtConfiguration from '@nuxt/config'
import moment from 'moment'
import {
  Configuration as WebpackConfiguration,
  Options as WebpackOptions,
  Plugin as WebpackPlugin
} from 'webpack'
import routers from './src/routers/'
import Env from './src/common/env/'

const pkg = require('./package')

const config: NuxtConfiguration = {
  mode: 'universal',
  srcDir: 'src/',

  /**
   * 環境変数
   * ビルド時に渡される env の値は、ここに記載することで文字列に置換される
   */
  env: {
    // Nuxt のビルドで必要な環境変数
    NODE_ENV: process.env.NODE_ENV || '',
    BUILD_ENV: process.env.BUILD_ENV || '',

    // Docker から渡ってくる Nuxt アプリで使う環境変数
    envName: process.env.envName || '',
    domain: process.env.domain || ''
  },

  /**
   * Build configuration
   * webpack のビルドに関する設定はここに書く
   */
  build: {
    // vue-devtools を許可するかどうかを設定します
    // https://ja.nuxtjs.org/api/configuration-build/#devtools
    devtools: true,

    // 特定の依存関係を Babel で変換したい場合、マッチする依存ファイル名の文字列または正規表現オブジェクトをここに書く
    transpile: ['helpful-decorators'],

    loaders: {
      // https://ja.nuxtjs.org/faq/webpack-audio-files/
      vue: {
        // 特殊なアトリビュートでも webpack の require がかまされるようにする
        transformAssetUrls: {
          audio: 'src',
          video: ['src', 'poster'],
          source: 'src',
          img: ['src', 'data-src'],
          'lazy-image': 'src'
        }
      }
    },

    /**
     * You can extend webpack config here
     */
    extend(
      config: WebpackConfiguration,
      ctx: {
        isDev: boolean
        isClient: boolean
        isServer: boolean
        loaders: any
      }
    ): void {
      // Run ESLint on save
      if (ctx.isDev && process.client) {
        if (config.module) {
          config.module.rules.push({
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/
          })
        }
      }

      // https://ja.nuxtjs.org/faq/webpack-audio-files/
      config.module!.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })

      // https://github.com/nuxt-community/dotenv-module/issues/11#issuecomment-376780588
      config.node = {
        fs: 'empty'
      }
    },
    // extractCSS: isProduction,

    // ビルドを爆速にする
    // https://qiita.com/toaru/items/0690a9110c94052bb479
    hardSource: true
  },

  // https://ja.nuxtjs.org/faq/host-port/
  server: {
    port: 4000,
    // 他のパソコンから IP でつながるように host を変更
    host: '0.0.0.0' // デフォルト: localhost
  },

  /**
   * Headers of the page
   */
  head: {
    title: pkg.title,
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { hid: 'charset', charset: 'utf-8' },
      {
        httpEquiv: 'Pragma',
        content: 'no-cache'
      },
      {
        httpEquiv: 'Cache-Control',
        content: 'content="no-cache, must-revalidate"'
      },
      {
        hid: 'viewport',
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      { hid: 'description', name: 'Description', content: pkg.description },
      { hid: 'noydir', name: 'robots', content: 'noydir' },
      { hid: 'noodp', name: 'robots', content: 'noodp' },
      { hid: 'index,follow', name: 'robots', content: 'index,follow' },
      {
        hid: 'format-detection',
        name: 'format-detection',
        content: 'telephone=no'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/vnd.microsoft.icon', href: '/favicon.ico' }
    ]
  },

  /**
   * Customize the progress-bar color
   */
  // loading: {
  //   color: 'blue',
  //   height: '5px'
  // },
  // ローディングを使わない場合はここを false
  loading: false,

  /**
   * Global CSS
   * 他の scss ファイルに依存しない scss はこちらに
   */
  css: [
    '@/assets/styles/reset.scss',
    '@/assets/styles/main.scss',
    'swiper/dist/css/swiper.css'
  ],

  /**
   * Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/constants-inject.ts',
    '@/plugins/env-inject.ts',
    '@/plugins/libraries/vue-lazyload.ts',
    '@/plugins/libraries/vee-validate.ts',
    '@/plugins/libraries/sanitize-html.ts',
    '@/plugins/libraries/lodash.ts',
    { src: '@/plugins/libraries/vue-carousel.ts', mode: 'client' },
    { src: '@/plugins/libraries/vue-awesome-swiper', mode: 'client' },
    { src: '@/plugins/libraries/autokana.ts', mode: 'client' },
    { src: '@/plugins/libraries/vue-slide-up-down.ts', mode: 'client' }
  ],

  /**
   * Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // https://github.com/nuxt-community/style-resources-module/
    '@nuxtjs/style-resources',
    // https://github.com/potato4d/nuxt-client-init-module
    // https://qiita.com/potato4d/items/cc5d8ea24949e86f8a5b
    'nuxt-client-init-module',
    'nuxt-user-agent',
    [
      'nuxt-env',
      {
        keys: [
          'TEST_ENV_VAR', // Basic usage—equivalent of { key: 'TEST_ENV_VAR' }
          { key: 'RUNTIME_ENV', default: 'defaultValue' } // Specify a default value
        ]
      }
    ],
    '@nuxtjs/proxy'
    // '@/modules/simple'
  ],

  /**
   * Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true
  },

  router: {
    // リロードのタイミングでは SSR 側で実行される
    // ルーティングの度に CSR 側で実行される
    // check-auth のような middleware を作る場合は、ログインの必要のない画面でも middleware が実行されるので注意が必要
    middleware: [],

    extendRoutes(routes: any, resolve: any): void {
      // https://ja.nuxtjs.org/api/configuration-router/#extendroutes
      if (routers && routers.length > 0) {
        for (const fn of routers) {
          routes.push(fn(resolve))
        }
      }
    }
  },

  /**
   * Sass の @extend を使う場合はこのパスの scss ファイルに CSS クラスを書く
   */
  styleResources: {
    scss: [
      '@/assets/styles/base/**/*.scss',
      '@/assets/styles/components/**/*.scss',
      '@/assets/styles/modal/**/*.scss',
      '@/assets/styles/parts/**/*.scss'
    ]
  }

  /**
   * nuxt サーバーを API サーバーとして使う場合のミドルウェアを定義する
   */
  // serverMiddleware: [
  //   { path: '/api/healthcheck', handler: '~/api/healthcheck.js' }
  // ]
}

module.exports = config

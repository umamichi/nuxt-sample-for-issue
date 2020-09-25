/**
 * @file 環境変数をグローバルにセットする
 */

import { Context } from '@nuxt/vue-app'

export default (context: Context): void => {
  for (const k in context.app.$env) {
    if (!process.env[k]) {
      process.env[k] = context.app.$env[k]
    }
  }
}

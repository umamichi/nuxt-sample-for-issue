/**
 * @file autokana をグローバルにセットする
 */
// https://ja.nuxtjs.org/guide/plugins

import { Context } from '@nuxt/vue-app'
import * as AutoKana from 'vanilla-autokana'

// @ts-ignore
export default (context: Context, inject: any): void => {
  inject('autokana', AutoKana)
}

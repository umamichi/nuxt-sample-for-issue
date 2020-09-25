import Vue from 'vue'
import VueRouter from 'vue-router'
// import { ErrorParams } from '@nuxt/vue-app'
interface ErrorParams {
  statusCode?: string
  message?: string
  customMessage?: string // カスタムエラー画面用に追加
}

declare module 'vue/types/vue' {
  interface NuxtApp {
    error(params: ErrorParams): void
  }
}

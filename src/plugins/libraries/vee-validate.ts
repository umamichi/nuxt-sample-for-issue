import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import ja from 'vee-validate/dist/locale/ja'
import _ from 'lodash'

// inject: false にしないと SSR 時にメモリリークするようなので、そうしている
// Component Injections | VeeValidate - https://baianat.github.io/vee-validate/concepts/injections.html#disabling-automatic-injection
Vue.use(VeeValidate, { inject: false })

const password = {
  validate(value: string): boolean {
    // alpha_dash（半角英数字と-_）と.を許可
    const pattern = /^[\w._-]+$/
    return pattern.test(value)
  }
}

Validator.extend('password', password)

const hiragana = {
  validate(value: string): boolean {
    // ひらがな（あ〜ゞ）とスペース（半角・全角）のみ一致
    const pattern = /^[ぁ-ゞ\s]+$/
    return pattern.test(value)
  }
}

Validator.extend('hiragana', hiragana)

// エラーメッセージ上書き
// https://docs.google.com/spreadsheets/d/14AHmlc4yx4v4kVZFzG8mCexaufPfNHe0x6KkRu4fi7o/edit#gid=483300100
const jaCustomDict = {
  messages: {
    required: (n: string): string => `${n}は必須です。`,
    password: (n: string): string =>
      `${n}は，半角英数字(記号は「.」,「_」,「-」のみ使用可)で入力してください。`,
    confirmed: (n: string): string => '再入力欄の値が異なります。',
    max: (n: string, ...e: any[]): string => {
      const k = _.flattenDeep(e)
      return `${n}は${k[0]}文字以内で入力してください。`
    },
    date_format: (n: string): string => `${n}が日付として正しくありません。`,
    url: (n: string): string => `${n}の形式が正しくありません。`,
    hiragana: (n: string): string => `${n}はひらがなで入力してください。`,
    email: (n: string): string => `${n}の形式が正しくありません。`,
    half_width_digit: (n: string): string =>
      `${n}は半角数字を使用してください。`,
    length: (n: string, ...e: any[]): string => {
      const k = _.flattenDeep(e)
      return `${n}は${k[0]}文字以上${k[1]}文字以内で入力してください。`
    },
    numeric: (n: string): string => `${n}は半角数字を使用してください。`
  }
}
const mergedDict = _.assign(ja, jaCustomDict)

Validator.localize('ja', mergedDict)

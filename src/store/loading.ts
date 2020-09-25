/**
 * loading 用インターフェイス
 */
export interface IState {
  /**
   * ローディング表示
   */
  isLoading: boolean
}

/**
 * state
 */
export const state = (): IState => ({
  isLoading: false
})

/**
 * getters
 */
export const getters = {
  isLoading(state: IState): boolean {
    return state.isLoading
  }
}

/**
 * mutations
 */
export const mutations = {
  saveLoading(state: IState): void {
    state.isLoading = true
  },
  saveUnloading(state: IState): void {
    state.isLoading = false
  }
}

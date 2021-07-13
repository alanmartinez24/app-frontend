import { collectionsConstants as constants } from '../constants'
import produce from 'immer'

export function lightMode (state = {}, action) {
  console.log(`state.lightMode`, state.lightMode)
  return produce(state, draft => {
    switch (action.type) {
      case constants.TOGGLE_COLOR_THEME:
        draft = !state.lightMode
        break
      default:
        return state
    }
  })
}

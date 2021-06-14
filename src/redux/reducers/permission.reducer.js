import { followConstants as constants } from '../constants'
import produce from 'immer'

export function userPermissions (state = {}, action) {
  return produce(state, draft => {
    switch (action.type) {
      case constants.FETCH_PERMS:
        draft[action.eosname] = {
          isLoading: true,
          permission: '',
          error: null
        }
        break
      case constants.FETCH_PERMS_SUCCESS:
        console.log(`action`, action)
        draft[action.eosname] = {
          isLoading: false,
          error: null,
          permission: action.loggedUserPermissions
        }
        break
      case constants.FETCH_PERMS_FAILURE:
        draft[action.eosname] = {
          isLoading: false,
          permission: '',
          error: action.error
        }
        break
      default:
        return state
    }
  })
}

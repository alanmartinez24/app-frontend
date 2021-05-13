import { collectionsConstants as constants } from '../constants'
import produce from 'immer'

export function userCollections (state = {}, action) {
  return produce(state, draft => {
    switch (action.type) {
      case constants.FETCH_COLLECTIONS:
        draft[action.eosname] = {
          isLoading: true,
          collections: [],
          error: null
        }
        break
      case constants.FETCH_COLLECTIONS_SUCCESS:
        draft[action.eosname] = {
          isLoading: false,
          collections: action.collections,
          error: null
        }
        break
      case constants.FETCH_COLLECTIONS_FAILURE:
        draft[action.eosname] = {
          isLoading: false,
          collections: [],
          error: action.error
        }
        break
      case constants.ADD_COMMENT:
        if (draft[action.postid]) {
          const prevCollections = draft[action.eosname].collections
          prevCollections.push({
            collection: action.collection
          })
        }
        break
      default:
        return state
    }
  })
}

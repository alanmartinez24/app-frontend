import { collectionsConstants as constants } from '../constants'
import axios from 'axios'
const BACKEND_API = process.env.BACKEND_API

export function fetchUserCollections (eosname) {
  return async dispatch => {
    dispatch(request(eosname))
    try {
      const collections = (await axios.get(`${BACKEND_API}/accounts/${eosname}/collections`)).data
      dispatch(success(eosname, collections))
    } catch (err) {
      dispatch(failure(eosname, err))
    }
  }

  function request (eosname) {
    return { type: constants.FETCH_COLLECTIONS, eosname }
  }

  function success (eosname, collections) {
    return { type: constants.FETCH_COLLECTIONS_SUCCESS, eosname, collections }
  }

  function failure (eosname, error) {
    return { type: constants.FETCH_COLLECTIONS_FAILURE, eosname, error }
  }
}

export function addCollection (eosname, collection) {
  return { type: constants.ADD_COLLECTION, eosname, collection }
}

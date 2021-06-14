import { permissionConstants as constants } from '../constants'
import axios from 'axios'
const BACKEND_API = process.env.BACKEND_API

export function fetchUserPermissions (eosname) {
  return async dispatch => {
    dispatch(request(eosname))
    try {
      const { permissions } = (await axios.post(`${BACKEND_API}/v1/chain/get_account`, { account_name: eosname })).data
      if (permissions) {
        const allPermNames = permissions.map((perm) => perm.perm_name)
        const loggedUserPermissions = allPermNames.includes('yup') ? 'yup' : 'active'
        console.log(`loggedUserPermissions`, loggedUserPermissions)
        dispatch(success(eosname, loggedUserPermissions))
      }
    } catch (err) {
      dispatch(failure(eosname, err))
    }
  }
  function request (eosname) {
    return { type: constants.FETCH_PERMS, eosname }
  }
  function success (eosname, loggedUserPermissions) {
    return { type: constants.FETCH_PERMS_SUCCESS, eosname, loggedUserPermissions }
  }

  function failure (eosname, error) {
    return { type: constants.FETCH_PERMS_FAILURE, eosname, error }
  }
}

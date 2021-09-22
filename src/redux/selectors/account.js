import { createSelector } from 'reselect'

const scatterIdentitySelector = state => state.scatterRequest && state.scatterRequest.account
const ethSelector = state => state.ethAuth
const userPermissionsSelector = state => state.userPermissions

export const accountInfoSelector = createSelector(
  [scatterIdentitySelector, ethSelector, userPermissionsSelector],
  (scatter, eth, permissions) => {
    let account = scatter || eth
    const twitterIdentity = localStorage.getItem('twitterMirrorInfo')
    if (account && permissions && permissions[account.name]) {
      account.authority = permissions[account.name].userPerm
    }
    if (!scatter) {
      if (eth && eth.account && eth.account._id) {
        account = { name: eth.account._id, authority: null }
      } else if (twitterIdentity) {
        account = { name: JSON.parse(twitterIdentity).name, authority: 'active' }
      }
    }
    return account
})

export const ethAuthSelector = createSelector([ethSelector], (ethAuth) => {
  let ethAuthInfo = ethAuth.account ? ethAuth : null
  return ethAuthInfo
})

import { createSelector } from 'reselect'

const scatterIdentitySelector = state => state.scatterRequest && state.scatterRequest.account
const ethAuthSelector = state => state.ethAuth
const userPermissionsSelector = state => state.userPermissions

export const accountInfoSelector = createSelector(
  [scatterIdentitySelector, ethAuthSelector, userPermissionsSelector],
  (scatter, eth, persmissions) => {
    let account = scatter || eth
    const twitterIdentity = localStorage.getItem('twitterMirrorInfo')
    if (account && persmissions && persmissions[account.name]) {
      account.authority = persmissions[account.name].perm
    }
    if (!scatter) {
      if (eth) {
        account = { name: eth._id, authority: 'active' }
      } else if (twitterIdentity) {
        account = { name: JSON.parse(twitterIdentity).name, authority: 'active' }
      }
    }
    return account
})

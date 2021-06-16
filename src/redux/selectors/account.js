import { createSelector } from 'reselect'

const scatterIdentitySelector = state => state.scatterRequest && state.scatterRequest.account
const ethAuthSelector = state => state.ethAuth

export const accountInfoSelector = () => {
  createSelector(scatterIdentitySelector, ethAuthSelector, (scatter, eth) => {
    let account = scatter || eth
    const twitterIdentity = localStorage.getItem('twitterMirrorInfo')
    if (!scatter) {
      if (eth) {
        account = { name: eth._id, authority: 'active' }
      } else if (twitterIdentity) {
        account = { name: JSON.parse(twitterIdentity).name, authority: 'active' }
      }
    }
    return account
  })
}

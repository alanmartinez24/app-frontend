import { pushEthMirrorTx, pushTwitterMirrorTx } from './push-transaction'
const { YUP_CONTRACT_ACCOUNT, YUP_ACCOUNT_MANAGER } = process.env

export async function createpost (account, data, ethAuth) {
  const isTwitMirror = localStorage.getItem('twitterMirrorInfo')
  const permission = isTwitMirror || ethAuth ? 'createpostv3' : account.authority
  const txData = {
    actions: [
      {
        account: YUP_CONTRACT_ACCOUNT,
        name: 'noop',
        authorization: [{
          actor: YUP_ACCOUNT_MANAGER,
          permission: 'active'
        }],
        data: {}
      },
      {
        account: YUP_CONTRACT_ACCOUNT,
        name: 'createpostv3',
        authorization: [{
          actor: account.name,
          permission
        }, {
          actor: YUP_ACCOUNT_MANAGER,
          permission: 'active'
        }],
        data: {
          ram_payer: YUP_ACCOUNT_MANAGER,
          img_hash: data.imgHash,
          video_hash: data.videoHash,
          author: account.name,
          tag: 'general',
          timestamp: (new Date()).getTime(),
          caption: data.caption
        }
      }
    ]
  }
  if (isTwitMirror) {
    await pushTwitterMirrorTx(txData)
  } else {
    await pushEthMirrorTx(ethAuth, txData)
  }
}

export async function editpost (account, data, ethAuth) {
  const isTwitMirror = localStorage.getItem('twitterMirrorInfo')
  const permission = isTwitMirror || ethAuth ? 'editpost' : account.authority
  const txData = {
    actions: [
      {
        account: YUP_CONTRACT_ACCOUNT,
        name: 'noop',
        authorization: [{
          actor: YUP_ACCOUNT_MANAGER,
          permission: 'active'
        }],
        data: {}
      },
      {
        account: YUP_CONTRACT_ACCOUNT,
        name: 'editpost',
        authorization: [{
          actor: account.name,
          permission
        }, {
          actor: YUP_ACCOUNT_MANAGER,
          permission: 'active'
        }],
        data: {
          ram_payer: YUP_ACCOUNT_MANAGER,
          img_hash: data.imgHash,
          video_hash: data.videoHash,
          tag: 'general',
          postid: data.postid,
          caption: data.caption
        }
      }
    ]
  }
  if (isTwitMirror) {
    await pushTwitterMirrorTx(txData)
  } else {
    await pushEthMirrorTx(ethAuth, txData)
  }
}

export async function deletepost (account, data, ethAuth) {
  const isTwitMirror = localStorage.getItem('twitterMirrorInfo')
  const permission = isTwitMirror || ethAuth ? 'deletepost' : account.authority
  const txData = {
    actions: [
      {
        account: YUP_CONTRACT_ACCOUNT,
        name: 'noop',
        authorization: [{
          actor: YUP_ACCOUNT_MANAGER,
          permission: 'active'
        }],
        data: {}
      },
      {
        account: YUP_CONTRACT_ACCOUNT,
        name: 'deletepost',
        authorization: [{
          actor: account.name,
          permission
        }, {
          actor: YUP_ACCOUNT_MANAGER,
          permission: 'active'
        }],
        data: {
          ram_payer: YUP_ACCOUNT_MANAGER,
          postid: data.postid
        }
      }
    ]
  }
  if (isTwitMirror) {
    await pushTwitterMirrorTx(txData)
  } else {
    await pushEthMirrorTx(ethAuth, txData)
  }
}

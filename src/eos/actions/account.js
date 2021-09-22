import { pushEthMirrorTx, pushTwitterMirrorTx } from './push-transaction'
const { YUPX_TOKEN_ACCOUNT, YUP_CONTRACT_ACCOUNT, YUP_ACCOUNT_MANAGER } = process.env

export async function transfer (account, data, ethAuth) {
  const normalizedAmount = `${Number(data.amount).toFixed(4)} ${data.asset}`
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
        account: data.asset === 'EOS' ? 'eosio.token' : YUPX_TOKEN_ACCOUNT,
        name: 'transfer',
        authorization: [{
          actor: account.name,
          permission: account.authority
        }],
        data: {
          from: account.name,
          to: data.recipient,
          quantity: normalizedAmount,
          memo: ''
        }
      }
    ]
  }
  if (localStorage.getItem('twitterMirrorInfo')) {
    await pushTwitterMirrorTx(txData)
  } else {
    await pushEthMirrorTx(ethAuth, txData)
  }
}

export async function createacct (account, data, ethAuth) {
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
        name: 'createacct',
        authorization: [{
          actor: account.name,
          permission: account.authority
        },
        {
          actor: YUP_ACCOUNT_MANAGER,
          permission: 'active'
        }],
        data: {
          ram_payer: YUP_ACCOUNT_MANAGER,
          owner: data.username,
          eosname: account.name,
          bio: data.bio,
          avatar: data.avatar,
          username: data.username
        }
      }
    ]
  }
  if (localStorage.getItem('twitterMirrorInfo')) {
    await pushTwitterMirrorTx(txData)
  } else {
    await pushEthMirrorTx(ethAuth, txData)
  }
}

// export async function editacct2 (account, data, ethAuth) {
//   const txData = {
//     actions: [
//       {
//         account: YUP_CONTRACT_ACCOUNT,
//         name: 'noop',
//         authorization: [{
//           actor: YUP_ACCOUNT_MANAGER,
//           permission: 'active'
//         }],
//         data: {}
//       },
//       {
//         account: YUP_CONTRACT_ACCOUNT,
//         name: 'editacct2',
//         authorization: [{
//           actor: account.name,
//           permission: account.authority
//         }, {
//           actor: YUP_ACCOUNT_MANAGER,
//           permission: 'active'
//         }],
//         data: {
//           ram_payer: YUP_ACCOUNT_MANAGER,
//           owner: account.name,
//           fullname: data.fullname || '',
//           bio: data.bio || '',
//           avatar: data.avatar || '',
//           eth_address: data.eth_address || ''
//         }
//       }
//     ]
//   }
//
//   await pushEthMirrorTx(ethAuth, txData)
// }

export async function editacct (account, data, ethAuth) {
  const permission = ethAuth ? 'editacct' : account.authority
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
        name: 'editacct',
        authorization: [{
          actor: account.name,
          permission
        }, {
          actor: YUP_ACCOUNT_MANAGER,
          permission: 'active'
        }],
        data: {
          ram_payer: YUP_ACCOUNT_MANAGER,
          owner: account.name,
          fullname: data.fullname || '',
          bio: data.bio || '',
          avatar: data.avatar || ''
        }
      }
    ]
  }

  if (localStorage.getItem('twitterMirrorInfo')) {
    await pushTwitterMirrorTx(txData)
  } else {
    await pushEthMirrorTx(ethAuth, txData)
  }
}

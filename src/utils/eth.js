import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'
import { providers } from 'ethers'
import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider'

const { WALLET_CONNECT_BRIDGE, POLY_RPC_URL, POLY_CHAIN_ID } = process.env

// export const getBalancePolygonProvider = () => {
//   const maticProvider = new MaticWalletConnectProvider(
//     {
//       host: POLY_RPC_URL,
//       callbacks: {
//         onConnect: console.log('matic provider connected'),
//         onDisconnect: console.log('matic provider disconnected')
//       }
//     }
//   )
//   const maticWeb3 = new Web3(maticProvider)
//   console.log('maticWeb3', maticWeb3)
//   return maticWeb3
// }

export const getPriceProvider = () => new providers.JsonRpcProvider(POLY_RPC_URL)

export const getPolygonProvider = () => {
  const maticProvider = new WalletConnectProvider(
    {
      bridge: WALLET_CONNECT_BRIDGE,
      rpc: {
        [POLY_CHAIN_ID]: POLY_RPC_URL
      },
      callbacks: {
        onConnect: console.log('matic provider connected'),
        onDisconnect: console.log('matic provider disconnected')
      }
    }
  )
  return maticProvider
}

export const enableAndSwitchProvider = async (provider) => {
  provider.updateRpcUrl(POLY_CHAIN_ID)
  await provider.enable()
  provider.updateRpcUrl(POLY_CHAIN_ID)
}

export const getWeb3InstanceOfProvider = (provider) => new Web3(provider)

export const getConnector = async () => {
  try {
    const connector = new WalletConnect({ bridge: WALLET_CONNECT_BRIDGE, qrcodeModal: QRCodeModal })
    connector.rpcUrl = POLY_RPC_URL
    connector.chainId = POLY_CHAIN_ID
    return connector
  } catch (err) {
    throw err
  }
}

export const getConnectorNoModal = async () => {
  try {
    const connector = new WalletConnect({ bridge: WALLET_CONNECT_BRIDGE })
    connector.rpcUrl = POLY_RPC_URL
    connector.chainId = POLY_CHAIN_ID
    return connector
  } catch (err) {
    throw err
  }
}

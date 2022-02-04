import Web3 from 'web3'
import * as MaticProvider from '@maticnetwork/walletconnect-provider'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

const { WALLET_CONNECT_BRIDGE, POLY_RPC_URL, POLY_CHAIN_ID } = process.env

export const getContractProvider = () => {
  const maticProvider = new MaticProvider(
    {
      host: POLY_RPC_URL,
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
  const maticWeb3 = new Web3(maticProvider)
  return maticWeb3
}

export const getTransactionProvider = () => {
  const provider = new WalletConnectProvider(
    {
      host: POLY_RPC_URL,
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
  const polyWeb3 = new Web3(provider)
  return polyWeb3
}

export const getConnector = () => {
  try {
    const connector = new WalletConnect({ bridge: WALLET_CONNECT_BRIDGE, qrcodeModal: QRCodeModal })
    return connector
  } catch (err) {
    throw err
  }
}

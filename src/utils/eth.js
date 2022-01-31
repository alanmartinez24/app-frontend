import Web3 from 'web3'
import WalletConnectProvider from '@maticnetwork/walletconnect-provider'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'

const { WALLET_CONNECT_BRIDGE, POLY_RPC_URL } = process.env

export const getPolygonWeb3Provider = () => {
  const maticProvider = new WalletConnectProvider(
    {
      host: POLY_RPC_URL,
      callbacks: {
        onConnect: console.log('matic provider connected'),
        onDisconnect: console.log('matic provider disconnected')
      }
    }
  )
  const maticWeb3 = new Web3(maticProvider)
  return maticWeb3
}

export const getEthConnector = () => {
  try {
    const connector = new WalletConnect({ bridge: WALLET_CONNECT_BRIDGE, qrcodeModal: QRCodeModal })
    return connector
  } catch (err) {
    throw err
  }
}

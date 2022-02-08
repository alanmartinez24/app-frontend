import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider'
import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'

const { WALLET_CONNECT_BRIDGE, POLY_RPC_URL, POLY_CHAIN_ID } = process.env

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
  const maticWeb3 = new Web3(maticProvider)
  return maticWeb3
}

export const signMessage = (connector, params) => {
  const customRequest = {
    id: 1337,
    jsonrpc: '2.0',
    method: 'eth_sign',
    params
  }

  connector
    .sendCustomRequest(customRequest)
    .then(result => {
      console.log(result)
    })
    .catch(error => {
      console.error(error)
    })
}

export const getConnector = () => {
  try {
    const connector = new WalletConnect({ bridge: WALLET_CONNECT_BRIDGE, qrcodeModal: QRCodeModal })
    connector.rpcUrl = POLY_RPC_URL
    connector.chainId = POLY_CHAIN_ID
    return connector
  } catch (err) {
    throw err
  }
}

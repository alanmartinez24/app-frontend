import Web3 from 'web3'
import WalletConnectProvider from '@maticnetwork/walletconnect-provider'

export const getPolygonWeb3Provider = () => {
  const maticProvider = new WalletConnectProvider(
    {
      host: 'https://rpc-mumbai.matic.today',
      callbacks: {
        onConnect: console.log('matic provider connected'),
        onDisconnect: console.log('matic provider disconnected')
      }
    }
  )
  const maticWeb3 = new Web3(maticProvider)
  return maticWeb3
}

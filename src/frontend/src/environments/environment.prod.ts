// Production environment — Railway deployment
// After deploying the relayer on Railway, replace RELAYER_URL below
// with the actual Railway URL (e.g. https://axolodao-relayer-production.up.railway.app)
export const environment = {
  production: true,
  contracts: {
    access:     '0x0090c33274dc0f48c20997f8b273f40c5abfa973',
    registry:   '0x5725ef787b437e398fd7dade7bd3e425bbf81f48',
    monitoring: '0x7fa54f7616b7e9f9e08b6295ec1df95aa3da00a9',
  },
  relayerUrl: 'https://RELAYER_URL.up.railway.app',
  apiUrl: 'https://ambydata-backend.vercel.app',
  useIndexer: true,
  chainId: 11155111,
  ensRegistry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  ensResolver: '0xE99638b40E4Fff0129D56f03b55b6bbC4BBE49b5',
};

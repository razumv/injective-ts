const injectiveAddress = 'inj14au322k9munkmx5wrchz9q30juf5wjgz2cfqku'
const injectiveAddress2 = 'inj14au322k9munkmx5wrchz9q30juf5wjgz2cfqkk'
const validatorAddress = 'injvaloper1lsuqpgm8kgwpq96ewyew26xnfwyn3lh3ncrkrk'
const validatorAddress2 = 'injvaloper1g4d6dmvnpg7w7yugy6kplndp7jpfmf3krtschp'
const spotMarketId =
  '0xa508cb32923323679f29a032c70342c147c17d0145625922b0ef22e955c844c0'
const derivativeMarketId =
  '0x7cc8b10d7deb61e744ef83bdec2bbcf4a056867e89b062c6a453020ca82bd4e4'
const subaccountId =
  '0xaf79152ac5df276d9a8e1e2e22822f9713474902000000000000000000000000'

export const injUsdtSpotMarket = {
  marketId:
    '0xa508cb32923323679f29a032c70342c147c17d0145625922b0ef22e955c844c0',
  marketStatus: 'active',
  ticker: 'INJ/USDT',
  baseDenom: 'inj',
  quoteDenom: 'peggy0xdAC17F958D2ee523a2206206994597C13D831ec7',
  quoteToken: {
    name: 'Tether',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    symbol: 'USDT',
    logo: 'https://static.alchemyapi.io/images/assets/825.png',
    decimals: 6,
    coinGeckoId: '',
  },
  baseToken: {
    name: 'Injective Protocol',
    address: '0xe28b3B32B6c345A34Ff64674606124Dd5Aceca30',
    symbol: 'INJ',
    logo: 'https://static.alchemyapi.io/images/assets/7226.png',
    decimals: 18,
    coinGeckoId: '',
  },
  makerFeeRate: '-0.0002',
  takerFeeRate: '0.002',
  serviceProviderFee: '0.4',
  minPriceTickSize: '0.000000000000001',
  minQuantityTickSize: '1000000000000000',
}

export const mockFactory = {
  injectiveAddress,
  injectiveAddress2,
  validatorAddress,
  validatorAddress2,
  derivativeMarketId,
  spotMarketId,
  subaccountId,
  injUsdtSpotMarket,
}
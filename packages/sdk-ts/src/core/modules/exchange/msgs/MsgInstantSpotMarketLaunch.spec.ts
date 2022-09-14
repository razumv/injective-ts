import { MsgInstantSpotMarketLaunch as BaseMsgInstantSpotMarketLaunch } from '@injectivelabs/chain-api/injective/exchange/v1beta1/tx_pb'
import MsgInstantSpotMarketLaunch from './MsgInstantSpotMarketLaunch'
import { mockFactory } from '@tests/mocks'
import snakecaseKeys from 'snakecase-keys'

const market = mockFactory.injUsdtSpotMarket

const params: MsgInstantSpotMarketLaunch['params'] = {
  proposer: mockFactory.injectiveAddress,
  market: {
    sender: mockFactory.injectiveAddress,
    ticker: market.ticker,
    baseDenom: market.baseDenom,
    quoteDenom: market.quoteDenom,
    minPriceTickSize: market.minPriceTickSize,
    minQuantityTickSize: market.minQuantityTickSize,
  },
}

const protoType = '/injective.exchange.v1beta1.MsgInstantSpotMarketLaunch'
const protoTypeAmino = 'exchange/MsgInstantSpotMarketLaunch'
const protoParams = {
  ...params.market,
}

const message = MsgInstantSpotMarketLaunch.fromJSON(params)

describe.only('MsgInstantSpotMarketLaunch', () => {
  it('generates proper proto', () => {
    const proto = message.toProto()

    expect(proto instanceof BaseMsgInstantSpotMarketLaunch).toBe(true)
    expect(proto.toObject()).toStrictEqual({
      ...protoParams,
      minPriceTickSize: '1000',
      minQuantityTickSize: '1000000000000000000000000000000000',
    })
  })

  it('generates proper data', () => {
    const data = message.toData()

    expect(data).toStrictEqual({
      '@type': protoType,
      ...protoParams,
      minPriceTickSize: '1000',
      minQuantityTickSize: '1000000000000000000000000000000000',
    })
  })

  it('generates proper amino', () => {
    const amino = message.toAmino()

    expect(amino).toStrictEqual({
      type: protoTypeAmino,
      ...protoParams,
    })
  })

  it('generates proper Eip712 types', () => {
    const eip712Types = message.toEip712Types()

    expect(Object.fromEntries(eip712Types)).toStrictEqual({
      MsgValue: [
        { name: 'sender', type: 'string' },
        { name: 'ticker', type: 'string' },
        { name: 'base_denom', type: 'string' },
        { name: 'quote_denom', type: 'string' },
        { name: 'min_price_tick_size', type: 'string' },
        { name: 'min_quantity_tick_size', type: 'string' },
      ],
    })
  })

  it('generates proper Eip712 values', () => {
    const eip712 = message.toEip712()

    expect(eip712).toStrictEqual({
      type: protoTypeAmino,
      value: snakecaseKeys({
        ...protoParams,
        min_price_tick_size: '0.000000000000001000',
        min_quantity_tick_size: '1000000000000000.000000000000000000',
      }),
    })
  })

  it('generates proper web3', () => {
    const web3 = message.toWeb3()

    expect(web3).toStrictEqual({
      '@type': protoType,
      ...protoParams,
    })
  })
})
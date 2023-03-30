import {
  TradeExecutionSide,
  TradeDirection,
  TradeExecutionType,
} from '../../../types/exchange'
import { PaginationOption } from '../../../types/pagination'
import { OrderSide, OrderState } from '@injectivelabs/ts-types'
import { IndexerGrpcSpotTransformer } from '../transformers'
import { IndexerModule } from '../types'
import {
  GrpcUnaryRequestException,
  UnspecifiedErrorCode,
} from '@injectivelabs/exceptions'
import { getGrpcIndexerWebImpl } from '../../BaseIndexerGrpcWebConsumer'
import { InjectiveSpotExchangeRpc } from '@injectivelabs/indexer-proto-ts'

/**
 * @category Indexer Grpc API
 */
export class IndexerGrpcSpotApi {
  protected module: string = IndexerModule.Spot

  protected client: InjectiveSpotExchangeRpc.InjectiveSpotExchangeRPCClientImpl

  constructor(endpoint: string) {
    this.client =
      new InjectiveSpotExchangeRpc.InjectiveSpotExchangeRPCClientImpl(
        getGrpcIndexerWebImpl(endpoint),
      )
  }

  async fetchMarkets(params?: {
    baseDenom?: string
    marketStatus?: string
    quoteDenom?: string
  }) {
    const { baseDenom, marketStatus, quoteDenom } = params || {}
    const request = InjectiveSpotExchangeRpc.MarketsRequest.create()

    if (baseDenom) {
      request.baseDenom = baseDenom
    }

    if (marketStatus) {
      request.marketStatus = marketStatus
    }

    if (quoteDenom) {
      request.quoteDenom = quoteDenom
    }

    try {
      const response = await this.client.Markets(request)

      return IndexerGrpcSpotTransformer.marketsResponseToMarkets(response)
    } catch (e: unknown) {
      if (e instanceof InjectiveSpotExchangeRpc.GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }

  async fetchMarket(marketId: string) {
    const request = InjectiveSpotExchangeRpc.MarketRequest.create()

    request.marketId = marketId

    try {
      const response = await this.client.Market(request)

      return IndexerGrpcSpotTransformer.marketResponseToMarket(response)
    } catch (e: unknown) {
      if (e instanceof InjectiveSpotExchangeRpc.GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }

  async fetchOrderbook(marketId: string) {
    const request = InjectiveSpotExchangeRpc.OrderbookRequest.create()

    request.marketId = marketId

    try {
      const response = await this.client.Orderbook(request)

      return IndexerGrpcSpotTransformer.orderbookResponseToOrderbook(response)
    } catch (e: unknown) {
      if (e instanceof InjectiveSpotExchangeRpc.GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }

  async fetchOrders(params?: {
    marketId?: string
    marketIds?: string[]
    subaccountId?: string
    orderSide?: OrderSide
    isConditional?: boolean
    pagination?: PaginationOption
  }) {
    const { marketId, marketIds, subaccountId, orderSide, pagination } =
      params || {}
    const request = InjectiveSpotExchangeRpc.OrdersRequest.create()

    if (marketId) {
      request.marketId = marketId
    }

    if (marketIds) {
      request.marketIds = marketIds
    }

    if (subaccountId) {
      request.subaccountId = subaccountId
    }

    if (orderSide) {
      request.orderSide = orderSide
    }

    /*
    if (isConditional !== undefined) {
      request.isConditional =isConditional
    }
    */

    if (pagination) {
      if (pagination.skip !== undefined) {
        request.skip = pagination.skip.toString()
      }

      if (pagination.limit !== undefined) {
        request.limit = pagination.limit
      }

      if (pagination.endTime !== undefined) {
        request.endTime = pagination.endTime.toString()
      }
    }

    try {
      const response = await this.client.Orders(request)

      return IndexerGrpcSpotTransformer.ordersResponseToOrders(response)
    } catch (e: unknown) {
      if (e instanceof InjectiveSpotExchangeRpc.GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }

  async fetchOrderHistory(params?: {
    subaccountId?: string
    marketId?: string
    marketIds?: string[]
    orderTypes?: OrderSide[]
    executionTypes?: TradeExecutionType[]
    direction?: TradeDirection
    isConditional?: boolean
    state?: OrderState
    pagination?: PaginationOption
  }) {
    const {
      subaccountId,
      marketId,
      marketIds,
      orderTypes,
      executionTypes,
      direction,
      state,
      pagination,
    } = params || {}

    const request = InjectiveSpotExchangeRpc.OrdersHistoryRequest.create()

    if (subaccountId) {
      request.subaccountId = subaccountId
    }

    if (marketId) {
      request.marketId = marketId
    }

    if (marketIds) {
      // request.marketIds = marketIds
    }

    if (orderTypes) {
      request.orderTypes = orderTypes
    }

    if (executionTypes) {
      request.executionTypes = executionTypes
    }

    if (direction) {
      request.direction = direction
    }

    if (state) {
      request.state = state
    }

    /*
    if (isConditional !== undefined) {
      request.isConditional =isConditional
    }
    */

    if (pagination) {
      if (pagination.skip !== undefined) {
        request.skip = pagination.skip.toString()
      }

      if (pagination.limit !== undefined) {
        request.limit = pagination.limit
      }

      if (pagination.endTime !== undefined) {
        request.endTime = pagination.endTime.toString()
      }
    }

    try {
      const response = await this.client.OrdersHistory(request)

      return IndexerGrpcSpotTransformer.orderHistoryResponseToOrderHistory(
        response,
      )
    } catch (e: unknown) {
      if (e instanceof InjectiveSpotExchangeRpc.GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }

  async fetchTrades(params?: {
    endTime?: number
    tradeId?: string
    marketId?: string
    startTime?: number
    marketIds?: string[]
    subaccountId?: string
    accountAddress?: string
    direction?: TradeDirection
    pagination?: PaginationOption
    executionSide?: TradeExecutionSide
    executionTypes?: TradeExecutionType[]
  }) {
    const {
      endTime,
      tradeId,
      marketId,
      startTime,
      direction,
      marketIds,
      pagination,
      subaccountId,
      executionSide,
      executionTypes,
      accountAddress,
    } = params || {}

    const request = InjectiveSpotExchangeRpc.TradesRequest.create()

    if (marketId) {
      request.marketId = marketId
    }

    if (marketIds) {
      request.marketIds = marketIds
    } else {
      request.marketIds = []
    }

    if (subaccountId) {
      request.subaccountId = subaccountId
    }

    if (accountAddress) {
      request.accountAddress = accountAddress
    }

    if (tradeId) {
      request.tradeId = tradeId
    }

    if (executionTypes) {
      request.executionTypes = executionTypes
    }

    if (executionSide) {
      request.executionSide = executionSide
    }

    if (direction) {
      request.direction = direction
    }

    if (startTime) {
      request.startTime = startTime.toString()
    }

    if (endTime) {
      request.endTime = endTime.toString()
    }

    if (pagination) {
      if (pagination.skip !== undefined) {
        request.skip = pagination.skip.toString()
      }

      if (pagination.limit !== undefined) {
        request.limit = pagination.limit
      }

      if (pagination.endTime !== undefined) {
        request.endTime = pagination.endTime.toString()
      }
    }

    try {
      const response = await this.client.Trades(request)

      return IndexerGrpcSpotTransformer.tradesResponseToTrades(response)
    } catch (e: unknown) {
      if (e instanceof InjectiveSpotExchangeRpc.GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }

  async fetchSubaccountOrdersList(params?: {
    subaccountId?: string
    marketId?: string
    pagination?: PaginationOption
  }) {
    const { subaccountId, marketId, pagination } = params || {}
    const request =
      InjectiveSpotExchangeRpc.SubaccountOrdersListRequest.create()

    if (subaccountId) {
      request.subaccountId = subaccountId
    }

    if (marketId) {
      request.marketId = marketId
    }

    if (pagination) {
      if (pagination.skip !== undefined) {
        request.skip = pagination.skip.toString()
      }

      if (pagination.limit !== undefined) {
        request.limit = pagination.limit
      }
    }

    try {
      const response = await this.client.SubaccountOrdersList(request)

      return IndexerGrpcSpotTransformer.ordersResponseToOrders(response)
    } catch (e: unknown) {
      if (e instanceof InjectiveSpotExchangeRpc.GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }

  async fetchSubaccountTradesList(params?: {
    subaccountId?: string
    marketId?: string
    direction?: TradeDirection
    executionType?: TradeExecutionType
    pagination?: PaginationOption
  }) {
    const { subaccountId, marketId, direction, executionType, pagination } =
      params || {}
    const request =
      InjectiveSpotExchangeRpc.SubaccountTradesListRequest.create()

    if (subaccountId) {
      request.subaccountId = subaccountId
    }

    if (marketId) {
      request.marketId = marketId
    }

    if (direction) {
      request.direction = direction
    }

    if (executionType) {
      request.executionType = executionType
    }

    if (pagination) {
      if (pagination.skip !== undefined) {
        request.skip = pagination.skip.toString()
      }

      if (pagination.limit !== undefined) {
        request.limit = pagination.limit
      }
    }

    try {
      const response = await this.client.SubaccountTradesList(request)

      return IndexerGrpcSpotTransformer.subaccountTradesListResponseToTradesList(
        response,
      )
    } catch (e: unknown) {
      if (e instanceof InjectiveSpotExchangeRpc.GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }

  async fetchOrderbooks(marketIds: string[]) {
    const request = InjectiveSpotExchangeRpc.OrderbooksRequest.create()

    if (marketIds.length > 0) {
      request.marketIds = marketIds
    }

    try {
      const response = await this.client.Orderbooks(request)

      return IndexerGrpcSpotTransformer.orderbooksResponseToOrderbooks(response)
    } catch (e: unknown) {
      if (e instanceof InjectiveSpotExchangeRpc.GrpcWebError) {
        throw new GrpcUnaryRequestException(new Error(e.toString()), {
          code: e.code,
          contextModule: this.module,
        })
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }

  async fetchOrderbooksV2(marketIds: string[]) {
    const request = InjectiveSpotExchangeRpc.OrderbooksV2Request.create()

    if (marketIds.length > 0) {
      request.marketIds = marketIds
    }

    try {
      const response = await this.client.OrderbooksV2(request)

      return IndexerGrpcSpotTransformer.orderbooksV2ResponseToOrderbooksV2(
        response,
      )
    } catch (e: unknown) {
      if (e instanceof GrpcUnaryRequestException) {
        throw e
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }

  async fetchOrderbookV2(marketId: string) {
    const request = InjectiveSpotExchangeRpc.OrderbookV2Request.create()

    request.marketId = marketId

    try {
      const response = await this.client.OrderbookV2(request)

      return IndexerGrpcSpotTransformer.orderbookV2ResponseToOrderbookV2(
        response,
      )
    } catch (e: unknown) {
      if (e instanceof GrpcUnaryRequestException) {
        throw e
      }

      throw new GrpcUnaryRequestException(e as Error, {
        code: UnspecifiedErrorCode,
        contextModule: this.module,
      })
    }
  }
}

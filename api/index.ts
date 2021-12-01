import pMap from 'p-map'
import { chunk, flatten, orderBy } from 'lodash'
import { utils as etherUtils, BigNumber } from 'ethers'
import type { OpenseaResponse, Asset } from '../utils/openseaTypes'

const apiKey = process.env.OPENSEA_API_KEY

const fetchCorruptionsPage = async (ids: string[]) => {
  let url = 'https://api.opensea.io/api/v1/assets?collection=corruption-s&'
  url += ids.map((id) => `token_ids=${id}`).join('&')

  const res = await fetch(url, /* {
    headers: {
      'X-API-KEY': apiKey
    },
  } */)
  const json: OpenseaResponse = await res.json()

  return Promise.all(
    json.assets.map(async (asset) => {
      return {
        ...asset,
        image_url: asset.image_url,
      }
    }),
  )
}

export interface ICorruptionsInfo {
  id: string
  price: Number
  url: string
  image: string
}

export const fetchCorruptions = async (traitIds) => {
  const chunked = chunk(traitIds, 20)
  const data = await pMap(chunked, fetchCorruptionsPage, { concurrency: 2 })
  const mapped = flatten(data)
    .filter(
      (a: Asset) =>
        a?.sell_orders?.[0]?.payment_token_contract.symbol === 'ETH',
    )
    .map((a: Asset): ICorruptionsInfo => {
      return {
        id: a.token_id,
        price: Number(
          etherUtils.formatUnits(
            BigNumber.from(a.sell_orders[0]?.current_price.split('.')[0]),
          ),
        ),
        url: a.permalink + '?ref=0x84356C4E5179091CEA85BE80Eac014960302467B',
        image: a.image_url,
      }
    })

  return {
    corruptions: orderBy(mapped, ['price', 'id'], ['asc', 'asc']),
    lastUpdate: new Date().toISOString(),
  }
}

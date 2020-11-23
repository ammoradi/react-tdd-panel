import axios from 'axios'

import { GIPHY_API_KEY } from 'constants/giphy'

import { GIPHY_SEARCH_URL, GIPHY_SEARCH_LIMIT } from './constants'

export const search = (query: string, page: number) => {
  try {
    if (!query) throw new Error("Query string doesn't provided for search api.")

    return axios({
      method: 'get',
      url: `${GIPHY_SEARCH_URL}?api_key=${GIPHY_API_KEY}&q=${query}&limit=${GIPHY_SEARCH_LIMIT}&offset=${
        (page - 1) * GIPHY_SEARCH_LIMIT
      }&rating=g&lang=en`
    })
  } catch (e) {
    console.error(e)
    return []
  }
}

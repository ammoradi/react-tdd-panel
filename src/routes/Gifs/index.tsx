import React, { useEffect, useReducer, useCallback } from 'react'
import isEmpty from 'lodash.isempty'
import { Input, Col, Button, message } from 'antd'

import { IGifObjectModel, IGiphyResultModel } from 'models/giphy'
import { search } from 'api'

import { IGifObject } from './Gifs.types'
import {
  initialState,
  reducer,
  toggleLoading as tl,
  setQuery,
  setPage,
  setGifs
} from './Gifs.store'
import { Container, SearchContainer, Gif, StyledRow } from './Gifs.styled'

const { Search } = Input

const normalizeGifs = (gifs: IGifObjectModel[]): IGifObject[] =>
  gifs.map((gif) => ({ id: gif.id, url: gif.images.downsized.url || '' }))

function Gifs() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const toggleLoading = useCallback(() => {
    dispatch(tl())
  }, [])

  const searchGifs = useCallback(async () => {
    try {
      const { query, page } = state
      toggleLoading()
      const result: IGiphyResultModel | any = await search(query, page)
      const {
        data: { data },
        status
      } = result

      if (isEmpty(data) || status !== 200) {
        toggleLoading()
        return
      }

      const nData = normalizeGifs(data)

      dispatch(setGifs(nData))
      toggleLoading()
    } catch (_) {
      toggleLoading()
    }
  }, [state])

  const handleSearch = useCallback((query: string) => {
    if (!query) {
      message.warn('Enter search string.')
      return
    }

    dispatch(setQuery(query))
  }, [])

  const handleLoadMore = useCallback(() => {
    dispatch(setPage('inc'))
  }, [])

  useEffect(() => {
    if (!state.query) return

    searchGifs()
  }, [state.query, state.page])

  return (
    <Container>
      <SearchContainer>
        <Search
          placeholder="search between gifs"
          enterButton="Search"
          size="large"
          loading={state.loading}
          onSearch={handleSearch}
        />
      </SearchContainer>

      <StyledRow gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {state.gifs.map((gifObj) => (
          <Col key={gifObj.id} className="gutter-row" span={6}>
            <Gif>
              <img src={gifObj.url} alt="" />
            </Gif>
          </Col>
        ))}
      </StyledRow>

      {state.gifs.length > 0 && (
        <Button onClick={handleLoadMore} loading={state.loading}>
          Load More
        </Button>
      )}
    </Container>
  )
}

export default Gifs

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../../app/store'

export interface Quote {
  id: number
  quote: string
  author: string
}

export interface QuotesApiResponse {
  quotes: Quote[]
  total: number
  skip: number
  limit: number
}

export const quotesApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState
      headers.set('x-counter-value', `${state.counter.value}`)
    },
  }),
  reducerPath: 'quotesApi',
  tagTypes: ['Quotes'],
  endpoints: (build) => ({
    getQuotes: build.query<QuotesApiResponse, number>({
      query: (limit = 10) => `quotes?limit=${limit}`,
      providesTags: (_result, _error, id) => [{ type: 'Quotes', id }],
    }),
  }),
})

export const { useGetQuotesQuery } = quotesApiSlice

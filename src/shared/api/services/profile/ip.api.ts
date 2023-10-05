import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const ipApi = createApi({
  reducerPath: 'ipApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.ipify.org', credentials: 'same-origin' }),
  endpoints: build => {
    return {
      getIp: build.query<any, void>({
        query: () => {
          return {
            url: '/?format=json',
          }
        },
      }),
    }
  },
})

export const { useGetIpQuery } = ipApi

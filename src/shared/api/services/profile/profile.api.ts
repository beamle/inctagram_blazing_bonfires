import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { baseURL } from '../baseUrl.api'

import { AvatarsType, BaseUserType, ProfileUserType } from './profile.api.types'

import { algByDecodingToken } from '@/shared/api/utils/algByDecodingToken'

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    credentials: 'same-origin',
  }),
  tagTypes: ['dataProfile'],
  endpoints: build => {
    return {
      getProfileUser: build.query<ProfileUserType, void>({
        query: () => {
          return {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: `users/profile`,
          }
        },
        providesTags: ['dataProfile'],
      }),
      updateProfile: build.mutation<ProfileUserType, ProfileUserType>({
        query: (data: ProfileUserType) => {
          const { ...body } = data

          return {
            method: 'PUT',
            url: 'users/profile',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            body,
          }
        },
        invalidatesTags: ['dataProfile'],
      }),
      updateAvatar: build.mutation<AvatarsType, FormData>({
        query: data => {
          return {
            method: 'POST',
            url: 'users/profile/avatar',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            body: data,
          }
        },
        invalidatesTags: ['dataProfile'],
      }),
      deleteAvatar: build.mutation<void, void>({
        query: () => {
          return {
            method: 'DELETE',
            url: 'users/profile/avatar',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
          }
        },
        invalidatesTags: ['dataProfile'],
      }),
    }
  },
})

export const {
  useUpdateProfileMutation,
  useUpdateAvatarMutation,
  useDeleteAvatarMutation,
  useLazyGetProfileUserQuery,
  useGetProfileUserQuery,
} = profileApi

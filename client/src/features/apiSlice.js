import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

 export const BASE_URL = 'http://localhost:4000/api'

export const apiSlice = createApi({
  reducerPath: 'api', 
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: '/users/getallusers',
        credentials: 'include', // Use 'include' for cookies/credentials
      }),
    }),
    getUserById: builder.query({
      query: (_id) => ({
        url: `/users/${_id}`,
        credentials: 'include', // Use 'include' for cookies/credentials
      }),

    }),
    getMyPreviousMessages : builder.query({
      query : (_id)=>({
        url : `/messages/${_id}`,
        credentials: 'include',
      })
    }),
    getReciverMessages : builder.query({
      query : (reciver_id) =>({
        url : `/messages/${reciver_id}`,
        credentials : "include"
      })
    })
  }),
});

export const { useGetAllUsersQuery, useGetUserByIdQuery  ,useGetMyPreviousMessagesQuery , useGetReciverMessagesQuery} = apiSlice;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: " https://testtourapp.herokuapp.com/" }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "users/signin" ,
          method: "post",
          body,
        };
      },
    }),
    registerUser: builder.mutation({
      query: (body: { firstName:string; lastName:string; email: string; password: string }) => {
        return {
          url: "users/signup" ,
          method: "post",
          body,
        };
      },
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useLoginUserMutation,useRegisterUserMutation } = authApi;
//https://testtourapp.herokuapp.com//users/signin
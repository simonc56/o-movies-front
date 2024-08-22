import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';
import { LoginCredentials, SignupCredentials, SuccessLoginResponse } from '../@types/Credentials';
import { UserType } from '../@types/SettingsState';
import apiSlice from '../apiHandler/apiSlice';

export const settingsApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['Profile'] }).injectEndpoints({
  endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
    login: builder.mutation<SuccessLoginResponse, LoginCredentials>({
      query: (credentials: LoginCredentials) => ({
        url: '/auth/login',
        method: 'post',
        data: { ...credentials },
      }),
      invalidatesTags: ['Profile'],
    }),
    register: builder.mutation({
      query: (credentials: SignupCredentials) => ({
        url: '/auth/register',
        method: 'post',
        data: { ...credentials },
      }),
    }),
    getProfile: builder.query<UserType, void>({
      query: () => ({
        url: '/profil',
      }),
      providesTags: ['Profile'],
    }),
  }),
});

// RTK Query automatically generates hooks for each endpoint
// as use{EndpointName}Query or use{EndpointName}Mutation
export const { useLoginMutation, useRegisterMutation, useGetProfileQuery } = settingsApiSlice;

import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';
import { Playlist, PlaylistIdentityType } from '../@types/PlaylistState';
import apiSlice from '../apiHandler/apiSlice';
import { moviesApiSlice } from './moviesApiSlice';

export const playlistApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['Playlists', 'Playlist'] }).injectEndpoints({
  endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
    createPlaylist: builder.mutation<{ playlist_id: number }, string>({
      query: (name: string) => ({
        url: '/playlist',
        method: 'POST',
        data: { name },
      }),
      invalidatesTags: ['Playlists'],
    }),
    renamePlaylist: builder.mutation<boolean, { id: number; name: string }>({
      query: ({ id, name }) => ({
        url: `/playlist/${id}`,
        method: 'PATCH',
        data: { name },
      }),
      invalidatesTags: ['Playlists'],
      onQueryStarted: async ({ id, name }, { dispatch, queryFulfilled }) => {
        const patchPlaylistResult = dispatch(
          playlistApiSlice.util.updateQueryData('getPlaylist', id, (draft) => {
            draft.name = name;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchPlaylistResult.undo();
        }
      },
    }),
    deletePlaylist: builder.mutation<number, number>({
      query: (id) => ({
        url: `/playlist/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => ['Playlists'],
    }),
    getPlaylist: builder.query<Playlist, number>({
      query: (id) => ({
        url: `/playlist/${id}`,
      }),
      providesTags: (_, __, id) => [
        { type: 'Playlist', id }, // Tag the specific playlist
      ],
    }),
    getUserPlaylists: builder.query<PlaylistIdentityType[], void>({
      query: () => ({
        url: '/playlist',
      }),
      providesTags: ['Playlists'],
      // transformResponse: (response: { data: PlaylistIdentityType[] }) => response.data,
    }),
    addMediaToPlaylist: builder.mutation<boolean, { id: number; tmdb_id: number }>({
      query: ({ id, tmdb_id }) => ({
        url: `/playlist/${id}/addmovie`,
        method: 'POST',
        data: { tmdb_id },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Playlist', id }, // Invalidate the specific playlist
      ],
      onQueryStarted: async ({ id, tmdb_id }, { dispatch, queryFulfilled }) => {
        const patchUserdataResult = dispatch(
          moviesApiSlice.util.updateQueryData('getUserdataMovieById', tmdb_id, (draft) => {
            if (draft) draft.in_playlists.push(id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchUserdataResult.undo();
        }
      },
    }),
    deleteMediaFromPlaylist: builder.mutation<number, { id: number; tmdb_id: number }>({
      query: ({ id, tmdb_id }) => ({
        url: `/playlist/${id}/deletemovie/${tmdb_id}`,
        method: 'DELETE',
      }),
      onQueryStarted: async ({ id, tmdb_id }, { dispatch }) => {
        moviesApiSlice.util.invalidateTags([{ type: 'MovieUserdata', id: tmdb_id }]);
        dispatch(
          playlistApiSlice.util.updateQueryData('getPlaylist', id, (draft) => {
            draft.medias = draft.medias.filter((media) => media.tmdb_id !== tmdb_id);
          })
        );
      },
    }),
  }),
});

export const {
  useCreatePlaylistMutation,
  useRenamePlaylistMutation,
  useDeletePlaylistMutation,
  useGetPlaylistQuery,
  useGetUserPlaylistsQuery,
  useAddMediaToPlaylistMutation,
  useDeleteMediaFromPlaylistMutation,
} = playlistApiSlice;

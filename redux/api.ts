import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Data } from '../typings';

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://retoolapi.dev/M9VzAZ'}),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        getAll: builder.query<Data[], void>({
            query: () => `data`,
            providesTags: [{type: "Products", id: "LIST"}]
        }),
        addProduct: builder.mutation<string, string>({
            query(name) {
                return {
                    url: `data`,
                    method: "POST",
                    body: {
                        name
                    }
                }
            },
            invalidatesTags: [{type: "Products", id: "LIST"}]
        }),
        updateProduct: builder.mutation<Data, Data>({
            query(product) {
                return {
                    url: `data/${product.id}`,
                    method: "PUT",
                    body: product
                }
            },
            invalidatesTags: [{type: "Products", id: "LIST"}]
        }),
        deleteTodo: builder.mutation<Data, Data>({
            query(product) {
                return {
                    url: `data/${product.id}`,
                    method: 'DELETE',
                    body: product
                }
            },
            invalidatesTags: [{type: "Products", id: "LIST"}]
        })
    })
})

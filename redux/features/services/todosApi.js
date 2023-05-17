import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/todos' }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: (page = 1) => '?_start=${page}&_limit=10',
            transformResponse: res => res.sort((a, b) => b.id - a.id),
            providesTags: ['Todos']
        }),
        addTodo: builder.mutation({
            query: (todo) => ({
                url: '/',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
         updateTodo: builder.mutation({
            query: (todo) => ({
                url: `/${todo.id}`,
                method: 'PATCH',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
    })
})

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
} = todosApi
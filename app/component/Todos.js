'use client'
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
} from '../../redux/features/services/todosApi'
import { useState } from 'react'

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('')
  const [page, setPage] = useState(1)

  const { data: todos, isLoading, isError, error } = useGetTodosQuery()
  const [addTodo] = useAddTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()

  const handleSubmit = (e) => {
    e.preventDefault()
    addTodo({ userId: 1, id: 1, title: newTodo, completed: false })
    setNewTodo('')
  }

  if (isLoading) {
    return <div>loading...</div>
  }

  if (isError) {
    console.log({ error })
    return <div>{error.status}</div>
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo">Enter a new todo item</label>
        <div className="new-todo">
          <input
            type="text"
            id="new-todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter new todo"
          />
        </div>
        <button className="submit">up</button>
      </form>
      <div>
        {todos.map((todo) => (
          <article key={todo.id}>
            <div className="todo">
              <input
                type="checkbox"
                checked={todo.completed}
                id={todo.id}
                onChange={() =>
                  updateTodo({ ...todo, completed: !todo.completed })
                }
              />
              <label htmlFor={todo.id}>{todo.title}</label>
            </div>
          </article>
        ))}
      </div>
      <button
        className="pagination"
        disabled={page <= 1}
        onClick={() => setPage((prev) => prev - 1)}
      >
        Prev
      </button>
      <button
        className="pagination"
        disabled={todos.length < 10}
        onClick={() => setPage((prev) => prev + 1)}
      >
        Next
      </button>
    </main>
  )
}
export default TodoList

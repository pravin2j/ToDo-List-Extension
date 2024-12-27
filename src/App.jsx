import React, { useEffect, useState } from 'react'
import './global.css'
import storage from './utils/storage'
const App = () => {
  const [todoList, setTodoList] = useState([])
  const [newTodo, setNewTodo] = useState("")

  const addTodo = (e) => {
    e.preventDefault()
    if (newTodo) {
      setTodoList([...todoList, {
        id: Date.now().toString(),
        data: newTodo,
        completed: false
      }])
      setNewTodo("")
    }
  }

  const toggleCompleted = (id) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }
  useEffect(() => {
    const loadTodos = async () => {
      const saved = await storage.getTodos()
      setTodoList(saved)
    }
    loadTodos()
  }, [])

  useEffect(() => {
    storage.setTodos(todoList)
  }, [todoList])

  const deleteItem = (id) => {
    setTodoList(todoList.filter((todo) => todo.id != id))
  }


  return (
    <div className='w-80 p-4 font-mono border-2'>
      <h1 className='text-3xl font-bold text-center'>ToDo List</h1>
      <form onSubmit={addTodo} className='border bg-gray-100 flex justify-between my-4 rounded-md'>
        <input type="text"
          value={newTodo}
          onChange={(e) => { setNewTodo(e.target.value) }}
          className='px-3 bg-gray-100 focus:outline-none'
          placeholder='Add something' />
        <button type='submit' className='bg-blue-400 font-bold px-3 py-1 rounded-r-md'>+</button>
      </form>

      <div className='flex flex-col gap-2'>
        {todoList.length === 0 ? <p>List is Empty.</p> : (
          todoList.map((todo) => (
            <div key={todo.id} className='flex items-center justify-between px-3 py-2 border rounded-md'>
              <div className='flex items-center gap-2'>
                <input
                  type="checkbox"
                  className='w-4 h-4'
                  checked={todo.completed}
                  onChange={() => toggleCompleted(todo.id)}
                />
                <span className={todo.completed ? "line-through text-blue-400" : ""}>
                  {todo.data}
                </span>
              </div>
              <button onClick={() => deleteItem(todo.id)} className='px-2 font-bold'>×</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
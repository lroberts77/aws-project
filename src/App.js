import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react'

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = { name: '', description: '' }

const App = () => {

  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetchTodos()
  }, [])
  
  function setInput(key, value) {
    setFormState({ ...formState, [key]: value})
  }

  const fetchTodos = async () => {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos))
      const todos = todoData.data.listTodos.items
      setTodos(todos)
    } catch (err) {
      console.log('error fetching todos')
    }
  }

  const addTodo = async () => {
    try {
      if (!formState.name || !formState.description) return
      const todo = { ...formState }
      setTodos([...todos, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createTodo, {input: todo}))
    } catch (err) {
      console.log('error creating todo:', err);
    }
  }

  return (
    <div className="app-container">
      <h2>AWS TODOS</h2>
      <input className="input"
        onChange={event => setInput('name', event.target.value)}
        value={formState.name}
        placeholder='name'
      />
      <input className="input"
        onChange={event => setInput('description', event.target.value)}
        value={formState.description}
        placeholder='description'
      />
      <button className="add-btn"
        onClick={addTodo}>
          Create todo
      </button>
      {
        todos.map((todo, index) => (
          <div className="todo" key={todo.id ? todo.id : index}>
            <p className="todo-name">{todo.name}</p>
            <p className="todo-description">{todo.description}</p>
          </div>
        ))
      }
    </div>
  );
}

export default App;

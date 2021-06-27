import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import './App.css';

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = { name: '', description: '' }

const App = () => {

  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])

  return (
    <div className="App">
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import './App.css';

const App = () => {
  return (
    <div className="App">
    </div>
  );
}

export default App;

import React from 'react';
import Header from './components/Header';
import Todos from './containers/Todos';
import AddTodo from './components/AddTodo';

function App() {
  return (
    <main id="app">
      <Header />

      <ul id="todo-list">
        <Todos/>
      </ul>

      <AddTodo />
    </main>
  )
}

export default App;

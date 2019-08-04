import React, { Component } from 'react';

import TodoItem from './TodoItem';

class TodoList extends Component {
  render() {
    const { todos, editTodo, toggleTodo, deleteTodo } = this.props;
    
    return todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        editTodo={editTodo}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    ));
  }
}

export default TodoList;

import React, { Component } from 'react';

class TodoItem extends Component {
  render() {
    const { todo, editTodo, toggleTodo, deleteTodo } = this.props;
    const { id, title } = todo;
    return (
      <li className="todo-item">
        <input
          className="checkbox"
          type="checkbox"
          onChange={(e) => {
            toggleTodo(id);
            e.target.parentNode.classList.toggle('completed');
          }}
          checked={todo.completed ? 'checked' : ''}
        />
        <label className="title">{title}</label>
        <input className="textfield" type="text" ref="textfieldInput" />
        <button
          className="edit"
          onClick={(e) => {
            
            if (e.target.parentNode.classList.contains('editing')) {
              // label.textContent = todo.title
              e.target.textContent = 'Изменить';
              e.target.parentNode.classList.remove('editing');

              editTodo({...todo, title: this.refs.textfieldInput.value});
              //console.log(todo, this.refs.textfieldInput.value)
            } else {
              this.refs.textfieldInput.value = title;
              e.target.textContent = 'Сохранить';
              e.target.parentNode.classList.add('editing');
            }
          }}
        >Изменить
      </button>
        <button className="delete" onClick={() => deleteTodo(id)}>Удалить</button>
      </li>
    );
  }
}

export default TodoItem;
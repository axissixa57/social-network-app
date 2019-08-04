import {
    ADD_TODO,
    EDIT_TODO,
    TOGGLE_TODO,
    DELETE_TODO,
  } from '../actions/todos';
  
  export function todos(state = [], action) {
    switch (action.type) {
      case ADD_TODO:
        return [...state, action.todo];
      case EDIT_TODO: {
        const index = state.findIndex(item => item.id === action.todo.id);
        const item = state.find(item => item.id === action.todo.id);
        Object.keys(action.todo).forEach(prop => item[prop] = action.todo[prop]);
        return [...state.slice(0, index), item, ...state.slice(index + 1)];
      }
      case TOGGLE_TODO: {
        const index = state.findIndex(item => item.id === action.id);
        const item = state.find(item => item.id === action.id);
        return [...state.slice(0, index), {...item, completed: !item.completed}, ...state.slice(index + 1)]
      }
      case DELETE_TODO: {
        const index = state.findIndex(item => item.id === action.id);
        return [...state.slice(0, index), ...state.slice(index + 1)]
      }
      default:
        return state;
    }
  }
  
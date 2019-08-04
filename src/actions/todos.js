export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export function addTodo(todo) {
    return { type: ADD_TODO, todo };
}
export function editTodo(todo) {
    return { type: EDIT_TODO, todo };
}
export function toggleTodo(id) {
    return { type: TOGGLE_TODO, id };
}
export function deleteTodo(id) {
    return { type: DELETE_TODO, id };
}
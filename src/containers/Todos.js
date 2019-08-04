import { connect } from 'react-redux';

import { editTodo, toggleTodo, deleteTodo } from '../actions/todos';
import TodoList from '../components/TodoList';

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
        editTodo: todo => dispatch(editTodo(todo)),
        toggleTodo: id => dispatch(toggleTodo(id)),
        deleteTodo: id => dispatch(deleteTodo(id)),
    };
};

const Todos = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);

export default Todos;

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTodo as addTodoAction } from '../actions/todos';

export class AddTodoUI extends Component {
    state = {
        id: new Date().getTime(),
        title: '',
        completed: false
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.title.length > 0) {
            this.props.addTodo(this.state);
            this.setState({ id: new Date().getTime(), title: '' });
        } else {
            alert('Необходимо ввести название задачи');
        }
    }

    onChange = (e) => this.setState({ title: e.target.value });

    render() {
        return (
            <form id="todo-form" onSubmit={this.onSubmit}>
                <input
                    id="add-input"
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                />
                <button
                    id="add-button"
                    type="submit"
                >
                    Добавить
                </button>
            </form>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTodo: state => {
            dispatch(addTodoAction(state))
        }
    }
}

const AddTodo = connect(
    null,
    mapDispatchToProps
)(AddTodoUI)

export default AddTodo;
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTodo as addTodoAction } from '../actions/todos';

class LoginFormUI extends Component {
    state = {
        email: '',
        password: '',
    }

    onChangeEmail = (e) => this.setState({ email: e.target.value });
    onChangePassword = (e) => this.setState({ password: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        this.props.auth(this.state);
    }

    render() {
        return (
            <form action="/users/login" method="POST" onSubmit={this.onSubmit}>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        class="form-control"
                        placeholder="Enter Email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                    />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        class="form-control"
                        placeholder="Enter Password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                    />
                </div>
                <button type="submit" class="btn btn-primary btn-block">Login</button>
            </form>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: state => {
            dispatch(login(state))
        }
    }
}

const LoginForm = connect(
    null,
    mapDispatchToProps
)(LoginFormUI)

export default LoginForm;
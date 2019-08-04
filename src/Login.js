import React from 'react';
import LoginForm from './components/LoginForm';
// import AddTodo from './components/AddTodo';

function Login() {
    return (
        <div class="container">
            <div class="row mt-5">
                <div class="col-md-6 m-auto">
                    <div class="card card-body">
                        <h1 class="text-center mb-3"><i class="fas fa-sign-in-alt"></i>  Login</h1>

                        <LoginForm/>

                        <p class="lead mt-4">
                            No Account? <a href="/users/register">Register</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;

